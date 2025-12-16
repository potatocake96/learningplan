// Learning Plan Assistant - Main JavaScript
// Handles barrier selection, adjustments with frequency/duration dropdowns, and comment generation

let openBarrierId = null;
let noteAdjustments = [];

// ==========================
// Beta: local class list + saved plans (localStorage)
// ==========================
const BETA_STORAGE_KEY = 'lpa_beta_v1';
let betaState = null;
let betaCurrentStudent = '';

function getAssignedAdjustmentsForCurrentStudent() {
  if (!isBetaEnabled() || !betaCurrentStudent) return [];
  const a = ensureStudentAssignment(betaCurrentStudent);
  return Array.isArray(a.adjustments) ? a.adjustments : [];
}

function getNoteTextForAssignedAdjustmentKey(key) {
  if (!key || typeof NCCD_DATA === 'undefined') return '';
  // key format: adj:{barrierId}:{idx}
  const parts = String(key).split(':');
  if (parts.length !== 3) return '';
  const barrierId = parts[1];
  const idx = Number(parts[2]);
  if (!Number.isFinite(idx)) return '';
  const arr = getBarrierAdjustments(barrierId);
  const adj = arr[idx];
  return adj?.text || '';
}

function getAdjustmentForNotesById(adjustmentId) {
  // If beta is on and a student is selected, prefer assigned adjustments
  if (isBetaEnabled() && betaCurrentStudent && adjustmentId && adjustmentId.startsWith('adj:')) {
    const assigned = getAssignedAdjustmentsForCurrentStudent();
    const found = assigned.find(a => a.key === adjustmentId);
    if (!found) return null;
    const noteText = found.noteText || getNoteTextForAssignedAdjustmentKey(found.key) || '';
    return {
      id: found.key,
      title: found.title,
      text: noteText,
      barrierId: found.barrierId || (found.key.split(':')[1] || ''),
      barrierLabel: NCCD_DATA?.barriers?.find(b => b.id === (found.barrierId || found.key.split(':')[1]))?.label || ''
    };
  }

  return noteAdjustments.find(a => a.id === adjustmentId) || null;
}

function loadBetaState() {
  try {
    const raw = localStorage.getItem(BETA_STORAGE_KEY);
    if (!raw) {
      return { enabled: false, teacherName: '', students: [], assignments: {} };
    }
    const parsed = JSON.parse(raw);
    return {
      enabled: !!parsed.enabled,
      teacherName: typeof parsed.teacherName === 'string' ? parsed.teacherName : '',
      students: Array.isArray(parsed.students) ? parsed.students.filter(s => typeof s === 'string') : [],
      assignments: parsed.assignments && typeof parsed.assignments === 'object' ? parsed.assignments : {}
    };
  } catch {
    return { enabled: false, teacherName: '', students: [], assignments: {} };
  }
}

function saveBetaState() {
  if (!betaState) return;
  try {
    localStorage.setItem(BETA_STORAGE_KEY, JSON.stringify(betaState));
  } catch {
    // ignore storage errors (private mode / disabled storage)
  }
}

function isBetaEnabled() {
  return !!betaState?.enabled;
}

function applyBetaVisibility() {
  const notesBanner = document.getElementById('betaBannerNotes');
  const notesStudentSelect = document.getElementById('betaStudentSelectNotes');
  const planPanel = document.getElementById('betaPanelPlan');
  const saveBarrierBtn = document.getElementById('betaSaveBarrierBtn');
  const savedPanel = document.getElementById('lpSavedPanel');

  const enable = isBetaEnabled();
  [notesBanner, notesStudentSelect, planPanel, saveBarrierBtn, savedPanel].forEach(el => {
    if (!el) return;
    el.classList.toggle('beta-hidden', !enable);
    el.setAttribute('aria-hidden', (!enable).toString());
  });

  // student name typing stays available; when beta is on we show dropdown in addition and auto-fill
  const studentInput = document.getElementById('studentName');
  if (studentInput) {
    // keep input visible if no students saved yet, otherwise encourage dropdown use
    const hideInput = enable && Array.isArray(betaState.students) && betaState.students.length > 0;
    studentInput.classList.toggle('beta-hidden', hideInput);
    studentInput.setAttribute('aria-hidden', hideInput.toString());
  }
}

function setStudentEverywhere(name) {
  const n = (name || '').trim();
  betaCurrentStudent = n;
  const studentInput = document.getElementById('studentName');
  if (studentInput && n) {
    studentInput.value = n;
    studentInput.dispatchEvent(new Event('input', { bubbles: true }));
  }

  const selNotes = document.getElementById('betaStudentSelectNotes');
  if (selNotes && selNotes.value !== n) selNotes.value = n;
  const selPlan = document.getElementById('betaStudentSelectPlan');
  if (selPlan && selPlan.value !== n) selPlan.value = n;

  renderSavedForStudent();

  // If beta is enabled, refresh notes dropdown to only show assigned adjustments for this student
  if (isBetaEnabled()) {
    populateNoteBarrierFilter();
    populateStrategyDropdown();
  }
}

function renderStudentSelectOptions() {
  const opts = (betaState?.students || []).slice().sort((a, b) => a.localeCompare(b));

  const fill = (select) => {
    if (!select) return;
    const current = select.value;
    select.innerHTML = '<option value=\"\">select student</option>';
    opts.forEach(s => {
      const o = document.createElement('option');
      o.value = s;
      o.textContent = s;
      select.appendChild(o);
    });
    if (current) select.value = current;
  };

  fill(document.getElementById('betaStudentSelectNotes'));
  fill(document.getElementById('betaStudentSelectPlan'));
}

function renderStudentPills() {
  const container = document.getElementById('betaStudentList');
  if (!container) return;
  container.innerHTML = '';

  (betaState?.students || []).slice().sort((a, b) => a.localeCompare(b)).forEach(name => {
    const pill = document.createElement('div');
    pill.className = 'beta-student-pill';
    pill.innerHTML = `<span>${name}</span><button type=\"button\" aria-label=\"remove ${name}\">×</button>`;
    pill.querySelector('button')?.addEventListener('click', () => {
      betaState.students = betaState.students.filter(s => s !== name);
      delete betaState.assignments?.[name];
      if (betaCurrentStudent === name) setStudentEverywhere('');
      saveBetaState();
      renderStudentSelectOptions();
      renderStudentPills();
      renderSavedForStudent();
      applyBetaVisibility();
    });
    container.appendChild(pill);
  });
}

function addStudent(name) {
  const n = (name || '').trim();
  if (!n) return;
  betaState.students = betaState.students || [];
  if (!betaState.students.includes(n)) betaState.students.push(n);
  saveBetaState();
  renderStudentSelectOptions();
  renderStudentPills();
  applyBetaVisibility();
  setStudentEverywhere(n);
}

function ensureStudentAssignment(studentName) {
  if (!betaState.assignments) betaState.assignments = {};
  if (!betaState.assignments[studentName]) {
    betaState.assignments[studentName] = { barriers: [], adjustments: [] };
  }
  if (!Array.isArray(betaState.assignments[studentName].barriers)) betaState.assignments[studentName].barriers = [];
  if (!Array.isArray(betaState.assignments[studentName].adjustments)) betaState.assignments[studentName].adjustments = [];
  return betaState.assignments[studentName];
}

function saveBarrierForStudent(barrierId) {
  if (!isBetaEnabled() || !betaCurrentStudent || !barrierId) return;
  const a = ensureStudentAssignment(betaCurrentStudent);
  if (!a.barriers.includes(barrierId)) a.barriers.push(barrierId);
  saveBetaState();
  renderSavedForStudent();
}

function saveAdjustmentForStudent(adjustmentObj) {
  if (!isBetaEnabled() || !betaCurrentStudent || !adjustmentObj) return;
  const a = ensureStudentAssignment(betaCurrentStudent);
  const key = adjustmentObj.key;
  a.adjustments = a.adjustments.filter(x => x.key !== key);
  a.adjustments.push(adjustmentObj);
  saveBetaState();
  renderSavedForStudent();
}

function removeSavedItem(key) {
  if (!isBetaEnabled() || !betaCurrentStudent || !key) return;
  const a = ensureStudentAssignment(betaCurrentStudent);
  a.barriers = a.barriers.filter(bid => `barrier:${bid}` !== key);
  a.adjustments = a.adjustments.filter(x => x.key !== key);
  saveBetaState();
  renderSavedForStudent();
}

function renderSavedForStudent() {
  const panel = document.getElementById('lpSavedPanel');
  const list = document.getElementById('lpSavedList');
  if (!panel || !list) return;

  if (!isBetaEnabled() || !betaCurrentStudent) {
    panel.classList.add('beta-hidden');
    panel.setAttribute('aria-hidden', 'true');
    return;
  }

  panel.classList.remove('beta-hidden');
  panel.setAttribute('aria-hidden', 'false');

  const a = ensureStudentAssignment(betaCurrentStudent);
  const items = [];

  (a.barriers || []).forEach(bid => {
    const b = NCCD_DATA?.barriers?.find(x => x.id === bid);
    if (!b) return;
    items.push({
      key: `barrier:${bid}`,
      title: `barrier — ${b.label}`,
      meta: b.description
    });
  });

  (a.adjustments || []).forEach(adj => {
    items.push({
      key: adj.key,
      title: `adjustment — ${adj.title}`,
      meta: adj.planText || adj.noteText || adj.text || ''
    });
  });

  list.innerHTML = '';
  if (!items.length) {
    const empty = document.createElement('div');
    empty.className = 'small';
    empty.textContent = 'nothing saved yet for this student.';
    list.appendChild(empty);
    return;
  }

  items.forEach(item => {
    const row = document.createElement('div');
    row.className = 'lp-saved-item';
    row.innerHTML = `
      <div>
        <div class=\"lp-saved-item-title\">${item.title}</div>
        <div class=\"lp-saved-item-meta\">${item.meta}</div>
      </div>
      <button class=\"btn ghost\" type=\"button\">remove</button>
    `;
    row.querySelector('button')?.addEventListener('click', () => removeSavedItem(item.key));
    list.appendChild(row);
  });
}

function initBeta() {
  // localStorage may be blocked; guard by try/catch inside load/save
  betaState = loadBetaState();

  const toggle = document.getElementById('betaEnableToggle');
  if (toggle) {
    toggle.checked = isBetaEnabled();
    toggle.addEventListener('change', () => {
      betaState.enabled = !!toggle.checked;
      saveBetaState();
      applyBetaVisibility();
      renderStudentSelectOptions();
      renderStudentPills();
      renderSavedForStudent();
    });
  }

  const teacherInput = document.getElementById('teacherName');
  if (teacherInput && isBetaEnabled() && betaState.teacherName) {
    teacherInput.value = betaState.teacherName;
  }
  if (teacherInput) {
    teacherInput.addEventListener('change', () => {
      if (!isBetaEnabled()) return;
      betaState.teacherName = teacherInput.value || '';
      saveBetaState();
    });
  }

  // student selects
  const selNotes = document.getElementById('betaStudentSelectNotes');
  if (selNotes) {
    selNotes.addEventListener('change', () => {
      setStudentEverywhere(selNotes.value || '');
    });
  }
  const selPlan = document.getElementById('betaStudentSelectPlan');
  if (selPlan) {
    selPlan.addEventListener('change', () => {
      setStudentEverywhere(selPlan.value || '');
    });
  }

  // add student
  const addInput = document.getElementById('betaAddStudentInput');
  const addBtn = document.getElementById('betaAddStudentBtn');
  if (addBtn && addInput) {
    addBtn.addEventListener('click', () => {
      addStudent(addInput.value);
      addInput.value = '';
    });
    addInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addStudent(addInput.value);
        addInput.value = '';
      }
    });
  }

  renderStudentSelectOptions();
  renderStudentPills();
  applyBetaVisibility();
  renderSavedForStudent();
}

function initNCCDPage() {
  // Set today's date
  const nccdDate = document.getElementById('nccdDate');
  if (nccdDate) {
    nccdDate.valueAsDate = new Date();
  }
  
  // Build flattened adjustment list for notes dropdown
  buildNoteAdjustments();

  // Populate diagnosis filter
  populateDiagnosisFilter();
  
  // Populate notes barrier filter and strategy dropdown
  populateNoteBarrierFilter();
  populateStrategyDropdown();
  
  // Render IP support sidebar list (if present)
  renderIPBarrierList();

  // Init tab interactions
  initTabs();
  initParallax();
  
  // Set copyright year
  const yearSpanMain = document.getElementById('copyrightYear');
  const yearSpanFooter = document.getElementById('copyrightYearFooter');
  const year = new Date().getFullYear();
  if (yearSpanMain) yearSpanMain.textContent = year;
  if (yearSpanFooter) yearSpanFooter.textContent = year;
  
  // Bind events
  bindEvents();

  // Beta (optional local storage)
  initBeta();
}

// Legacy IP accordion renderer (kept for reference; no longer used by the redesigned IP Support tab)

function getBarrierAdjustments(barrierId) {
  if (typeof NCCD_DATA === 'undefined') return [];
  const explicit = NCCD_DATA.barrierAdjustments?.[barrierId];
  if (Array.isArray(explicit) && explicit.length) return explicit;

  const barrier = NCCD_DATA.barriers?.find(b => b.id === barrierId);
  if (!barrier) return [];

  const templates = [];
  const tpl = NCCD_DATA.adjustmentTemplates || {};

  // diagnosis-specific templates
  (barrier.diagnosisIds || []).forEach(did => {
    const arr = tpl[did];
    if (Array.isArray(arr)) templates.push(...arr);
  });

  // general templates last
  if (Array.isArray(tpl.general)) templates.push(...tpl.general);

  // de-dupe by title and keep a small, useful set
  const seen = new Set();
  const result = [];
  for (const t of templates) {
    if (!t?.title || seen.has(t.title)) continue;
    seen.add(t.title);
    result.push({ title: t.title, text: t.text });
    if (result.length >= 4) break;
  }

  return result;
}

function buildNoteAdjustments() {
  noteAdjustments = [];
  if (typeof NCCD_DATA === 'undefined' || !Array.isArray(NCCD_DATA.barriers)) return;

  NCCD_DATA.barriers.forEach((barrier) => {
    const barrierId = barrier.id;
    const barrierLabel = barrier.label || barrierId;
    const adjustments = getBarrierAdjustments(barrierId);
    adjustments.forEach((adj, index) => {
      noteAdjustments.push({
        id: `${barrierId}__${index}`,
        title: adj.title,
        text: adj.text,
        barrierId,
        barrierLabel
      });
    });
  });
}

function populateNoteBarrierFilter() {
  const filterEl = document.getElementById('noteBarrierFilter');
  if (!filterEl || !noteAdjustments.length) return;

  const seen = new Set();
  filterEl.innerHTML = '<option value=\"\">all barriers</option>';

  const source = (isBetaEnabled() && betaCurrentStudent)
    ? getAssignedAdjustmentsForCurrentStudent().map(a => {
        const bid = a.barrierId || (a.key?.split(':')[1] || '');
        const label = NCCD_DATA?.barriers?.find(b => b.id === bid)?.label || bid;
        return { barrierId: bid, barrierLabel: label };
      })
    : noteAdjustments;

  source.forEach(adj => {
    const bid = adj.barrierId;
    if (!bid || seen.has(bid)) return;
    seen.add(bid);
    const opt = document.createElement('option');
    opt.value = bid;
    opt.textContent = adj.barrierLabel || bid;
    filterEl.appendChild(opt);
  });

  filterEl.addEventListener('change', () => {
    populateStrategyDropdown();
  });
}

function populateDiagnosisFilter() {
  const filterEl = document.getElementById('diagnosisFilter');
  if (!filterEl || typeof NCCD_DATA === 'undefined') return;
  
  NCCD_DATA.diagnoses.forEach(diag => {
    if (diag.id === 'all') return;
    const opt = document.createElement('option');
    opt.value = diag.id;
    opt.textContent = diag.label.toLowerCase();
    filterEl.appendChild(opt);
  });
  
  filterEl.addEventListener('change', () => {
    openBarrierId = null;
    renderIPBarrierList();
    renderIPDetail();
  });
}

function populateStrategyDropdown() {
  const strategyEl = document.getElementById('nccdStrategy');
  if (!strategyEl || !noteAdjustments.length) return;

  const barrierFilter = document.getElementById('noteBarrierFilter')?.value || '';

  // Beta mode: only show assigned adjustments for the selected student
  if (isBetaEnabled() && betaCurrentStudent) {
    const assigned = getAssignedAdjustmentsForCurrentStudent();
    strategyEl.innerHTML = '<option value=\"\">select an assigned adjustment</option>';

    const filtered = assigned.filter(a => {
      const bid = a.barrierId || (a.key?.split(':')[1] || '');
      return !barrierFilter || bid === barrierFilter;
    });

    if (!filtered.length) {
      strategyEl.innerHTML = '<option value=\"\">no assigned adjustments yet</option>';
      strategyEl.disabled = true;
      return;
    }

    strategyEl.disabled = false;
    filtered.forEach(a => {
      const bid = a.barrierId || (a.key?.split(':')[1] || '');
      const bLabel = NCCD_DATA?.barriers?.find(b => b.id === bid)?.label || '';
      const opt = document.createElement('option');
      opt.value = a.key;
      opt.textContent = bLabel ? `${a.title} — ${bLabel}` : a.title;
      strategyEl.appendChild(opt);
    });
    return;
  }

  // Normal mode: show full library
  strategyEl.disabled = false;
  strategyEl.innerHTML = '<option value=\"\">select an adjustment</option>';

  noteAdjustments.forEach(adj => {
    if (barrierFilter && adj.barrierId !== barrierFilter) return;
    const opt = document.createElement('option');
    opt.value = adj.id;
    opt.textContent = adj.barrierLabel ? `${adj.title} — ${adj.barrierLabel}` : adj.title;
    strategyEl.appendChild(opt);
  });
}

function getFilteredBarriers() {
  if (typeof NCCD_DATA === 'undefined') return [];
  
  const filter = document.getElementById('diagnosisFilter')?.value || '';
  if (!filter) return NCCD_DATA.barriers;
  
  return NCCD_DATA.barriers.filter(b => 
    Array.isArray(b.diagnosisIds) && b.diagnosisIds.includes(filter)
  );
}

function renderIPBarrierList() {
  const listEl = document.getElementById('ipBarrierList');
  const countEl = document.getElementById('ipBarrierCount');
  const searchEl = document.getElementById('ipSearch');
  if (!listEl) return; // not on this page / tab

  const q = (searchEl?.value || '').trim().toLowerCase();
  const filtered = getFilteredBarriers().filter(b => {
    if (!q) return true;
    return (
      (b.label || '').toLowerCase().includes(q) ||
      (b.description || '').toLowerCase().includes(q)
    );
  });

  listEl.innerHTML = '';
  if (countEl) countEl.textContent = `${filtered.length}`;

  filtered.forEach(b => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ip-barrier-item' + (openBarrierId === b.id ? ' is-active' : '');
    btn.innerHTML = `
      <div class="ip-barrier-title">${b.label}</div>
      <div class="ip-barrier-tags">${(b.diagnosisIds || []).join(', ')}</div>
    `;
    btn.addEventListener('click', () => {
      openBarrierId = b.id;
      renderIPBarrierList();
      renderIPDetail();
    });
    listEl.appendChild(btn);
  });
}

function renderIPDetail() {
  const emptyEl = document.getElementById('ipEmptyState');
  const cardEl = document.getElementById('ipDetailCard');
  const labelEl = document.getElementById('ipDetailLabel');
  const descEl = document.getElementById('ipDetailDesc');
  const copyBarrierBtn = document.getElementById('ipCopyBarrierBtn');
  const listEl = document.getElementById('ipAdjustmentsList');

  if (!emptyEl || !cardEl || !labelEl || !descEl || !listEl) return;

  if (!openBarrierId) {
    emptyEl.style.display = '';
    cardEl.style.display = 'none';
    return;
  }

  const barrier = NCCD_DATA?.barriers?.find(b => b.id === openBarrierId);
  if (!barrier) {
    emptyEl.style.display = '';
    cardEl.style.display = 'none';
    return;
  }

  emptyEl.style.display = 'none';
  cardEl.style.display = '';

  labelEl.textContent = barrier.label;
  descEl.textContent = barrier.description;

  if (copyBarrierBtn) {
    copyBarrierBtn.onclick = () => {
      const textarea = document.createElement('textarea');
      textarea.value = barrier.description;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);

      const originalText = copyBarrierBtn.textContent || 'copy barrier';
      copyBarrierBtn.textContent = 'copied';
      copyBarrierBtn.disabled = true;
      setTimeout(() => {
        copyBarrierBtn.textContent = originalText;
        copyBarrierBtn.disabled = false;
      }, 1800);
    };
  }

  const betaSaveBarrierBtn = document.getElementById('betaSaveBarrierBtn');
  if (betaSaveBarrierBtn) {
    const show = isBetaEnabled() && !!betaCurrentStudent;
    betaSaveBarrierBtn.classList.toggle('beta-hidden', !show);
    betaSaveBarrierBtn.setAttribute('aria-hidden', (!show).toString());
    betaSaveBarrierBtn.onclick = () => saveBarrierForStudent(openBarrierId);
  }

  const adjustments = getBarrierAdjustments(openBarrierId);
  const studentName = document.getElementById('studentName')?.value || 'the student';

  listEl.innerHTML = '';
  adjustments.forEach((adj, idx) => {
    const baseText = adj.text.replace(/{studentName}/g, studentName);
    const adjustmentId = `ip-${openBarrierId}-adj-${idx}`;
    const responsible = 'classroom teacher';
    const frequency = 'weekly';
    const duration = 'ongoing';
    const initialText = `${responsible.charAt(0).toUpperCase() + responsible.slice(1)} ${baseText} This adjustment will be implemented ${frequency}. This adjustment will continue for ${duration}.`;

    const wrapper = document.createElement('div');
    wrapper.className = 'ip-adj-card ip-adjustment-item';
    wrapper.setAttribute('data-base-text', baseText.replace(/"/g, '&quot;'));

    const saveBtnHtml = isBetaEnabled()
      ? `<button class="btn ghost ip-save-adj" type="button" data-save-key="adj:${openBarrierId}:${idx}" data-adj-title="${adj.title.replace(/"/g, '&quot;')}" data-note-text="${adj.text.replace(/"/g, '&quot;')}">save</button>`
      : '';

    wrapper.innerHTML = `
      <div class="ip-adj-head ip-adjustment-header">
        <div class="ip-adj-title">${adj.title}</div>
        <div style="display:flex;gap:8px;align-items:center">
          ${saveBtnHtml}
          <button class="btn secondary" type="button" onclick="copyAdjustmentText('${adjustmentId}')" style="padding:8px 16px;font-size:13px;min-width:auto">copy</button>
        </div>
      </div>
      <div class="ip-adj-controls ip-adjustment-controls">
        <div>
          <label>frequency</label>
          <select class="form-control ip-frequency" data-adjustment-id="${adjustmentId}">
            <option value="daily">daily</option>
            <option value="3x per week">3x per week</option>
            <option value="weekly" selected>weekly</option>
            <option value="fortnightly">fortnightly</option>
            <option value="as needed">as needed</option>
          </select>
        </div>
        <div>
          <label>responsible</label>
          <select class="form-control ip-responsible" data-adjustment-id="${adjustmentId}">
            <option value="classroom teacher" selected>classroom teacher</option>
            <option value="intervention teacher">intervention teacher</option>
            <option value="learning support teacher">learning support teacher</option>
            <option value="teaching assistant">teaching assistant</option>
            <option value="specialist teacher">specialist teacher</option>
            <option value="ED support staff">ED support staff</option>
          </select>
        </div>
        <div>
          <label>duration</label>
          <select class="form-control ip-duration" data-adjustment-id="${adjustmentId}">
            <option value="ongoing" selected>ongoing</option>
            <option value="1 term">1 term</option>
            <option value="2 terms">2 terms</option>
            <option value="1 semester">1 semester</option>
            <option value="1 year">1 year</option>
            <option value="6 weeks">6 weeks</option>
          </select>
        </div>
      </div>
      <textarea readonly class="nccd-copyable ip-adjustment-text" id="${adjustmentId}" rows="4">${initialText}</textarea>
    `;

    listEl.appendChild(wrapper);
  });

  // Bind dropdown changes for newly rendered adjustment cards
  listEl.querySelectorAll('.ip-frequency, .ip-responsible, .ip-duration').forEach(select => {
    select.addEventListener('change', function () {
      const adjustmentId = this.getAttribute('data-adjustment-id');
      if (adjustmentId) updateAdjustmentText(adjustmentId);
    });
  });

  // Bind save buttons (beta)
  if (isBetaEnabled()) {
    listEl.querySelectorAll('.ip-save-adj').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!betaCurrentStudent) return;
        const key = btn.getAttribute('data-save-key') || '';
        const title = btn.getAttribute('data-adj-title') || 'adjustment';
        const noteText = btn.getAttribute('data-note-text') || '';
        const container = btn.closest('.ip-adjustment-item');
        const textarea = container?.querySelector('textarea');
        const planText = textarea?.value || '';
        saveAdjustmentForStudent({
          key,
          title,
          barrierId: openBarrierId,
          noteText,
          planText
        });
        const orig = btn.textContent || 'save';
        btn.textContent = 'saved';
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = orig;
          btn.disabled = false;
        }, 1500);
      });
    });
  }
}

function toggleBarrier(barrierId) {
  if (openBarrierId === barrierId) {
    openBarrierId = null;
  } else {
    openBarrierId = barrierId;
  }
  updateIPSupport();
}

function updateIPSupport() {
  const barriers = getSelectedBarriers();
  const container = document.getElementById('ipSupportContent');
  const listContainer = document.getElementById('ipBarriersList');
  
  // If the currently open barrier is no longer selected, close it
  if (openBarrierId && !barriers.includes(openBarrierId)) {
    openBarrierId = null;
  }
  
  if (!barriers.length) {
    if (container) container.style.display = 'none';
    openBarrierId = null;
    return;
  }
  
  if (container) container.style.display = 'block';
  if (!listContainer || typeof NCCD_DATA === 'undefined') return;
  
  let html = '';
  let foundOpen = false;
  
  barriers.forEach((barrierId, barrierIdx) => {
    const barrier = NCCD_DATA.barriers.find(b => b.id === barrierId);
    if (!barrier) return;
    
    const adjustments = NCCD_DATA.barrierAdjustments[barrierId] || [];
    const barrierIdSafe = `barrier-${barrierIdx}`;
    const isOpen = !foundOpen && openBarrierId === barrierId;
    if (isOpen) foundOpen = true;
    
    html += `<div class="ip-barrier-section ${isOpen ? 'open' : ''}" id="${barrierIdSafe}">`;
    html += `<button class="ip-barrier-header" onclick="toggleBarrier('${barrierId}')">`;
    html += `<div class="barrier-label">`;
    html += `<strong id="${barrierIdSafe}-label">${barrier.label}</strong>`;
    html += `<div class="barrier-desc" id="${barrierIdSafe}-desc">${barrier.description}</div>`;
    html += `</div>`;
    html += `<button class="btn secondary" onclick="event.stopPropagation();copyBarrierText('${barrierIdSafe}')" style="padding:8px 16px;font-size:13px;position:absolute;right:50px;z-index:2">copy barrier</button>`;
    html += `<span class="toggle-icon">${isOpen ? '−' : '+'}</span>`;
    html += `</button>`;
    
    if (isOpen) {
      html += `<div class="ip-barrier-content">`;
      html += `<div style="margin-bottom:16px"><strong style="font-size:14px;color:var(--ink);text-transform:lowercase">recommended adjustments:</strong></div>`;
      html += `<div class="ip-adjustments-list">`;
      
      adjustments.forEach((adj, idx) => {
        const adjustmentId = `${barrierIdSafe}-adj-${idx}`;
        const studentName = document.getElementById('studentName')?.value || 'the student';
        const baseText = adj.text.replace(/{studentName}/g, studentName);
        const responsible = 'classroom teacher';
        const frequency = 'weekly';
        const duration = 'ongoing';
        const initialText = `${responsible.charAt(0).toUpperCase() + responsible.slice(1)} ${baseText} This adjustment will be implemented ${frequency}. This adjustment will continue for ${duration}.`;
        
        html += `<div class="ip-adjustment-item" data-base-text="${baseText.replace(/"/g, '&quot;')}">`;
        html += `<div class="ip-adjustment-header">`;
        html += `<strong>${adj.title}</strong>`;
        html += `<button class="btn secondary" onclick="copyAdjustmentText('${adjustmentId}')" style="padding:8px 16px;font-size:13px;min-width:auto">copy</button>`;
        html += `</div>`;
        html += `<div class="ip-adjustment-controls">`;
        html += `<div><label>frequency</label><select class="form-control ip-frequency" data-adjustment-id="${adjustmentId}" style="font-size:13px;padding:8px 12px"><option value="daily">daily</option><option value="3x per week">3x per week</option><option value="weekly" selected>weekly</option><option value="fortnightly">fortnightly</option><option value="as needed">as needed</option></select></div>`;
        html += `<div><label>responsible</label><select class="form-control ip-responsible" data-adjustment-id="${adjustmentId}" style="font-size:13px;padding:8px 12px"><option value="classroom teacher" selected>classroom teacher</option><option value="intervention teacher">intervention teacher</option><option value="learning support teacher">learning support teacher</option><option value="teaching assistant">teaching assistant</option><option value="specialist teacher">specialist teacher</option><option value="ED support staff">ED support staff</option></select></div>`;
        html += `<div><label>duration</label><select class="form-control ip-duration" data-adjustment-id="${adjustmentId}" style="font-size:13px;padding:8px 12px"><option value="ongoing" selected>ongoing</option><option value="1 term">1 term</option><option value="2 terms">2 terms</option><option value="1 semester">1 semester</option><option value="1 year">1 year</option><option value="6 weeks">6 weeks</option></select></div>`;
        html += `</div>`;
        html += `<textarea readonly class="ip-adjustment-text nccd-copyable" id="${adjustmentId}" rows="4">${initialText}</textarea>`;
        html += `</div>`;
      });
      
      html += `</div></div>`;
    }
    
    html += `</div>`;
  });
  
  listContainer.innerHTML = html;
  
  // Bind dropdown change events
  listContainer.querySelectorAll('.ip-frequency, .ip-responsible, .ip-duration').forEach(select => {
    select.addEventListener('change', function() {
      const adjustmentId = this.getAttribute('data-adjustment-id');
      if (adjustmentId) updateAdjustmentText(adjustmentId);
    });
  });
  
  // Update adjustment texts when student name changes
  const studentNameEl = document.getElementById('studentName');
  if (studentNameEl) {
    studentNameEl.addEventListener('input', () => {
      listContainer.querySelectorAll('.ip-adjustment-item').forEach(item => {
        const textarea = item.querySelector('textarea');
        if (textarea) {
          const adjustmentId = textarea.id;
          updateAdjustmentText(adjustmentId);
        }
      });
    });
  }
}

function updateAdjustmentText(adjustmentId) {
  const textarea = document.getElementById(adjustmentId);
  if (!textarea) return;
  const container = textarea.closest('.ip-adjustment-item');
  if (!container) return;
  
  const selects = container.querySelectorAll('select');
  if (selects.length < 3) return;
  
  const frequencySelect = selects[0];
  const responsibleSelect = selects[1];
  const durationSelect = selects[2];
  
  const frequency = frequencySelect?.value || '';
  const responsible = responsibleSelect?.value || '';
  const duration = durationSelect?.value || '';
  
  let baseText = container.getAttribute('data-base-text') || '';
  baseText = baseText.replace(/&quot;/g, '"');
  
  if (!baseText) return;
  
  const studentName = document.getElementById('studentName')?.value || 'the student';
  baseText = baseText.replace(/{studentName}/g, studentName);
  
  const responsibleCapitalized = responsible.charAt(0).toUpperCase() + responsible.slice(1);
  let fullText = `${responsibleCapitalized} ${baseText}`;
  
  if (frequency) {
    fullText += ` This adjustment will be implemented ${frequency}.`;
  }
  
  if (duration) {
    fullText += ` This adjustment will continue for ${duration}.`;
  }
  
  textarea.value = fullText;
}

function copyBarrierText(barrierId) {
  const desc = document.getElementById(`${barrierId}-desc`)?.textContent || '';
  if (!desc) return;
  
  const textarea = document.createElement('textarea');
  textarea.value = desc;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  
  const btn = event.target;
  if (btn) {
    const originalText = btn.textContent;
    btn.textContent = 'Copied!';
    btn.style.background = 'var(--tangerine-dark)';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
    }, 2000);
  }
}

function copyAdjustmentText(adjustmentId) {
  const textarea = document.getElementById(adjustmentId);
  if (!textarea) return;
  const container = textarea.closest('.ip-adjustment-item');
  if (!container) return;
  textarea.select();
  document.execCommand('copy');
  const button = container.querySelector('button[onclick*="copyAdjustmentText"]');
  if (button) {
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.style.background = 'var(--tangerine-dark)';
    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = '';
    }, 2000);
  }
}

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString + 'T00:00:00');
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function generateAdjustmentComment() {
  const studentName = document.getElementById('studentName')?.value || '';
  const date = document.getElementById('nccdDate')?.value;
  const adjustmentId = document.getElementById('nccdStrategy')?.value;
  const engagement = document.getElementById('nccdEngagement')?.value;
  const outcome = document.getElementById('nccdOutcome')?.value;
  const commentField = document.getElementById('nccdAdjustmentComment');
  
  if (!studentName || !adjustmentId) {
    alert('Please enter a student name and select an adjustment');
    return;
  }
  
  if (typeof NCCD_DATA === 'undefined') {
    alert('Data not loaded. Please refresh the page.');
    return;
  }
  
  const adjustment = getAdjustmentForNotesById(adjustmentId);
  if (!adjustment) {
    alert('Selected adjustment could not be found. Please refresh the page.');
    return;
  }

  let comment = '';
  
  if (date) {
    const formattedDate = formatDate(date);
    comment = `On ${formattedDate}, `;
  }
  
  const teacherName = document.getElementById('teacherName')?.value.trim();
  const teacherPhrase = teacherName ? `${teacherName} ` : 'The teacher ';

  // Convert adjustment text from future tense to past tense
  let adjustmentText = adjustment.text.replace(/{studentName}/g, studentName);
  // Convert "will provide" -> "provided", "will implement" -> "implemented", "will use" -> "used", etc.
  adjustmentText = adjustmentText
    .replace(/\bwill provide\b/gi, 'provided')
    .replace(/\bwill implement\b/gi, 'implemented')
    .replace(/\bwill use\b/gi, 'used')
    .replace(/\bwill teach\b/gi, 'taught')
    .replace(/\bwill create\b/gi, 'created')
    .replace(/\bwill arrange\b/gi, 'arranged')
    .replace(/\bwill break\b/gi, 'broke')
    .replace(/\bwill build\b/gi, 'built')
    .replace(/\bwill adjust\b/gi, 'adjusted')
    .replace(/\bwill ensure\b/gi, 'ensured')
    .replace(/\bwill support\b/gi, 'supported')
    .replace(/\bwill reduce\b/gi, 'reduced')
    .replace(/\bwill optimise\b/gi, 'optimised')
    .replace(/\bwill differentiate\b/gi, 'differentiated')
    .replace(/\bwill explicitly teach\b/gi, 'explicitly taught')
    .replace(/\bwill gradually extend\b/gi, 'gradually extended')
    .replace(/\bwill simplify\b/gi, 'simplified')
    .replace(/\bwill model\b/gi, 'modelled')
    .replace(/\bwill pre-teach\b/gi, 'pre-taught')
    .replace(/\bwill explore\b/gi, 'explored')
    .replace(/\bwill integrate\b/gi, 'integrated');
  
  comment += `${teacherPhrase}${adjustmentText}`;
  
  if (engagement && NCCD_DATA.engagementDescriptors[engagement]) {
    comment += ` ${NCCD_DATA.engagementDescriptors[engagement]} during these activities.`;
  }
  
  if (outcome && NCCD_DATA.outcomeDescriptors[outcome]) {
    const outcomeText = NCCD_DATA.outcomeDescriptors[outcome].replace(/{studentName}/g, studentName);
    comment += ` ${outcomeText}`;
  }
  
  if (commentField) commentField.value = comment;
}

function copyToClipboard(elementId) {
  const element = document.getElementById(elementId);
  if (!element || !element.value) return;
  element.select();
  document.execCommand('copy');
  const btn = event.target;
  if (btn) {
    const originalText = btn.textContent;
    btn.textContent = 'Copied!';
    setTimeout(() => {
      btn.textContent = originalText;
    }, 2000);
  }
}

function bindEvents() {
  // Update IP support when student name changes
  const studentNameEl = document.getElementById('studentName');
  if (studentNameEl) {
    studentNameEl.addEventListener('input', () => {
      renderIPDetail();
    });
  }

  const ipSearch = document.getElementById('ipSearch');
  if (ipSearch) {
    ipSearch.addEventListener('input', () => {
      renderIPBarrierList();
    });
  }

  // Keep adjustment notes student select in sync when beta is enabled
  const betaSelNotes = document.getElementById('betaStudentSelectNotes');
  if (betaSelNotes) {
    betaSelNotes.addEventListener('change', () => {
      setStudentEverywhere(betaSelNotes.value || '');
    });
  }
  
  // Parallax scroll effect for app page
  initParallax();
}

function initParallax() {
  if (typeof window === 'undefined') return;
  
  let ticking = false;
  const pageBands = document.querySelectorAll('.page-band');
  
  function updateParallax() {
    const scroll = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    pageBands.forEach((band, index) => {
      const rect = band.getBoundingClientRect();
      const elementTop = rect.top + scroll;
      const elementCenter = elementTop + rect.height / 2;
      const distanceFromCenter = scroll + windowHeight / 2 - elementCenter;
      const parallaxSpeed = 0.15;
      
      if (Math.abs(distanceFromCenter) < windowHeight) {
        const translateY = distanceFromCenter * parallaxSpeed;
        band.style.transform = `translateY(${translateY}px)`;
        band.style.opacity = 1 - Math.abs(distanceFromCenter) / windowHeight * 0.3;
      }
    });
    
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick, { passive: true });
}

function initTabs() {
  const tabLinks = document.querySelectorAll('.tab-link');
  const panels = document.querySelectorAll('.tab-panel');
  const sectionSelect = document.getElementById('sectionSelect');
  const sectionMenu = document.querySelector('[data-section-menu]');
  const sectionMenuButton = document.getElementById('sectionMenuButton');
  const sectionMenuValue = document.querySelector('[data-section-menu-value]');
  const sectionMenuItems = document.querySelectorAll('.section-menu-item[data-tab]');
  if (!panels.length) return;

  function activatePanel(targetId) {
    if (!targetId) return;

    panels.forEach(panel => {
      panel.classList.toggle('is-active', panel.id === targetId);
    });

    if (tabLinks.length) {
      tabLinks.forEach(link => {
        const id = link.getAttribute('data-tab');
        link.classList.toggle('is-active', id === targetId);
      });
    }

    if (targetId === 'tab-plan') {
      renderIPBarrierList();
      renderIPDetail();
    }
  }

  function setMenuActive(targetId) {
    if (!sectionMenuItems.length) return;
    sectionMenuItems.forEach(item => {
      const isActive = item.getAttribute('data-tab') === targetId;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-checked', isActive ? 'true' : 'false');
    });
    if (sectionMenuValue) {
      const activeItem = Array.from(sectionMenuItems).find(i => i.classList.contains('is-active'));
      const label = activeItem?.getAttribute('data-label') || 'Section';
      sectionMenuValue.textContent = label;
    }
  }

  if (tabLinks.length) {
    tabLinks.forEach(link => {
      link.addEventListener('click', () => {
        const targetId = link.getAttribute('data-tab');
        if (!targetId) return;
        if (sectionSelect) sectionSelect.value = targetId;
        setMenuActive(targetId);
        activatePanel(targetId);
      });
    });
  }

  if (sectionSelect) {
    sectionSelect.addEventListener('change', () => {
      const targetId = sectionSelect.value;
      setMenuActive(targetId);
      activatePanel(targetId);
    });
  }

  // Popover section menu
  if (sectionMenu && sectionMenuButton && sectionMenuItems.length) {
    function closeMenu() {
      sectionMenu.dataset.open = 'false';
      sectionMenuButton.setAttribute('aria-expanded', 'false');
    }
    function openMenu() {
      sectionMenu.dataset.open = 'true';
      sectionMenuButton.setAttribute('aria-expanded', 'true');
    }
    function toggleMenu() {
      const isOpen = sectionMenu.dataset.open === 'true';
      if (isOpen) closeMenu();
      else openMenu();
    }

    sectionMenuButton.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMenu();
    });

    sectionMenuItems.forEach(item => {
      item.addEventListener('click', () => {
        const targetId = item.getAttribute('data-tab');
        if (!targetId) return;
        if (sectionSelect) sectionSelect.value = targetId;
        setMenuActive(targetId);
        activatePanel(targetId);
        closeMenu();
      });
    });

    document.addEventListener('click', (e) => {
      if (!sectionMenu.contains(e.target)) closeMenu();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    // init state
    sectionMenu.dataset.open = 'false';
    setMenuActive('tab-plan');
    activatePanel('tab-plan');
  }
}

function initParallax() {
  const bands = document.querySelectorAll('.page-band');
  if (!bands.length) return;

  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY || window.pageYOffset || 0;
      bands.forEach((band, index) => {
        const speed = 0.02 + index * 0.01;
        const offset = y * speed;
        band.style.transform = `translateY(${offset}px)`;
      });
    },
    { passive: true }
  );
}

// Make functions globally available
window.initNCCDPage = initNCCDPage;
window.generateAdjustmentComment = generateAdjustmentComment;
window.copyToClipboard = copyToClipboard;
window.toggleBarrier = toggleBarrier;
window.copyBarrierText = copyBarrierText;
window.copyAdjustmentText = copyAdjustmentText;
