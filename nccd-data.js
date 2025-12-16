// Local text database for Learning Plan Assistant
// All barriers and adjustments are stored here as plain text.
// Barriers use non-deficit language focusing on environmental factors.

const NCCD_DATA = {
  diagnoses: [
    { id: "all", label: "All areas" },
    { id: "dyslexia", label: "Dyslexia / specific learning difficulty (reading)" },
    { id: "dysgraphia", label: "Dysgraphia / specific learning difficulty (writing)" },
    { id: "dyscalculia", label: "Dyscalculia / specific learning difficulty (numeracy)" },
    { id: "adhd", label: "ADHD / attention and executive functioning" },
    { id: "asd", label: "Autism spectrum" },
    { id: "dld", label: "Developmental language disorder" },
    { id: "id", label: "Intellectual disability / global learning delay" },
    { id: "social-emotional", label: "Social, emotional and mental health" },
    { id: "eald", label: "EAL/D (English as an Additional Language or Dialect)" },
    { id: "gifted", label: "Giftedness / high potential" },
    { id: "medical", label: "Medical / health needs" },
    { id: "vision", label: "Vision impairment" },
    { id: "hearing", label: "Hearing impairment" },
    { id: "physical", label: "Physical / motor" }
  ],

  // Barriers written in non-deficit language (focusing on environmental factors)
  barriers: [
    {
      id: "reading-fluency",
      label: "reading fluency",
      diagnosisIds: ["dyslexia"],
      description: "lack of sufficient opportunities for students to practise reading at an appropriate pace, due to limited instructional time or resources focused on reading fluency development"
    },
    {
      id: "comprehension",
      label: "reading comprehension",
      diagnosisIds: ["dyslexia", "dld"],
      description: "additional supports required in the learning environment due to lack of explicit instruction in comprehension strategies needed to understand and interpret text"
    },
    {
      id: "decoding",
      label: "decoding skills",
      diagnosisIds: ["dyslexia"],
      description: "lack of sufficient support in instructional methods for students to develop effective word recognition strategies, due to limited systematic phonics instruction or decoding practice"
    },
    {
      id: "vocabulary",
      label: "vocabulary knowledge",
      diagnosisIds: ["dyslexia", "dld"],
      description: "additional supports required in curriculum and teaching approaches due to lack of adequate exposure to and explicit instruction in vocabulary needed to comprehend text"
    },
    {
      id: "engagement",
      label: "engagement and motivation",
      diagnosisIds: ["adhd", "asd", "social-emotional"],
      description: "lack of sufficient engagement in the learning environment and instructional materials, due to materials not aligning with student interests or learning preferences"
    },
    {
      id: "confidence",
      label: "reading confidence",
      diagnosisIds: ["dyslexia", "social-emotional"],
      description: "additional supports required in the classroom environment due to lack of sufficient opportunities or supportive structures for students to build confidence when reading aloud or independently"
    },
    {
      id: "phonemic-awareness",
      label: "phonemic awareness",
      diagnosisIds: ["dyslexia"],
      description: "lack of adequate opportunities in early literacy instruction for students to develop phonemic awareness, due to insufficient foundational instruction in sound-letter relationships"
    },
    {
      id: "reading-stamina",
      label: "reading stamina",
      diagnosisIds: ["adhd", "physical"],
      description: "additional supports required in the learning environment due to lack of sufficient support or gradual progression for students to build sustained focus and attention during extended reading tasks"
    },
    {
      id: "text-structure",
      label: "text structure understanding",
      diagnosisIds: ["dyslexia", "dld"],
      description: "lack of adequate instruction in how to identify and navigate different text structures, due to limited explicit teaching of text organisation and features"
    },
    {
      id: "inference-skills",
      label: "inference skills",
      diagnosisIds: ["dyslexia", "dld", "asd"],
      description: "additional supports required in teaching methods due to lack of sufficient explicit instruction and practice in drawing inferences needed to read between the lines and understand implicit meaning"
    },
    {
      id: "self-monitoring",
      label: "self-monitoring skills",
      diagnosisIds: ["dyslexia", "adhd"],
      description: "lack of adequate support in the instructional approach for students to develop strategies for independently detecting and correcting errors during reading, due to limited metacognitive instruction"
    },
    {
      id: "writing-connection",
      label: "reading-writing connection",
      diagnosisIds: ["dyslexia", "dysgraphia"],
      description: "additional supports required in curriculum design due to lack of sufficient integration of reading and writing activities, limiting opportunities for students to make connections between these literacy domains"
    },
    {
      id: "handwriting-speed",
      label: "handwriting speed and legibility",
      diagnosisIds: ["dysgraphia", "physical"],
      description: "lack of sufficient support in instructional approaches for students to develop efficient handwriting, due to limited opportunities for fine motor skill development or alternative response modes"
    },
    {
      id: "writing-organisation",
      label: "organising ideas in writing",
      diagnosisIds: ["dysgraphia", "adhd", "dld"],
      description: "additional supports required in teaching methods due to lack of explicit instruction in planning and structuring written work, limiting opportunities for students to organise ideas effectively"
    },
    {
      id: "spelling-accuracy",
      label: "spelling accuracy",
      diagnosisIds: ["dyslexia", "dysgraphia"],
      description: "lack of adequate support in instructional methods for students to develop spelling strategies, due to limited systematic instruction in spelling patterns and word structure"
    },
    {
      id: "number-sense",
      label: "number sense and place value",
      diagnosisIds: ["dyscalculia", "id"],
      description: "additional supports required in curriculum and teaching approaches due to lack of sufficient concrete and visual experiences needed to develop understanding of quantity and number relationships"
    },
    {
      id: "math-facts",
      label: "recalling basic number facts",
      diagnosisIds: ["dyscalculia"],
      description: "lack of sufficient opportunities for overlearning and practice needed to develop automatic recall of basic number facts, due to limited instructional time focused on fact fluency"
    },
    {
      id: "attention-sustained",
      label: "sustaining attention during instruction",
      diagnosisIds: ["adhd"],
      description: "additional supports required in the learning environment due to lack of sufficient structure and engagement strategies needed to maintain focus during whole-class or extended instruction"
    },
    {
      id: "executive-function",
      label: "managing materials and multi-step tasks",
      diagnosisIds: ["adhd", "asd"],
      description: "lack of adequate support in organisational strategies and task breakdown needed for students to independently manage materials and complete multi-step activities"
    },
    {
      id: "impulsivity",
      label: "managing impulsive responses",
      diagnosisIds: ["adhd"],
      description: "additional supports required in classroom structures due to lack of sufficient explicit teaching of self-regulation strategies and wait-time protocols"
    },
    {
      id: "routine-changes",
      label: "managing changes to routine",
      diagnosisIds: ["asd"],
      description: "lack of sufficient preparation and visual supports needed to help students anticipate and adapt to changes in routine, transitions, or unexpected events"
    },
    {
      id: "social-communication",
      label: "understanding social expectations",
      diagnosisIds: ["asd", "dld"],
      description: "additional supports required in teaching approaches due to lack of explicit instruction in social communication skills and group work expectations"
    },
    {
      id: "sensory-processing",
      label: "sensory processing in classroom environment",
      diagnosisIds: ["asd", "adhd"],
      description: "lack of adequate environmental adjustments needed to support sensory regulation, due to limited consideration of lighting, noise levels, or access to sensory tools"
    },
    {
      id: "oral-language-comprehension",
      label: "understanding complex oral language",
      diagnosisIds: ["dld", "hearing"],
      description: "additional supports required in instructional delivery due to lack of sufficient simplification, repetition, or visual supports needed to access spoken information"
    },
    {
      id: "expressive-language",
      label: "expressing ideas using age-appropriate language",
      diagnosisIds: ["dld"],
      description: "lack of sufficient modelling and language-rich opportunities needed for students to develop expressive language skills and use subject-specific vocabulary"
    },
    {
      id: "curriculum-pace",
      label: "keeping pace with year-level curriculum",
      diagnosisIds: ["id", "dyslexia", "dyscalculia"],
      description: "additional supports required in curriculum delivery due to lack of sufficient differentiation and extended practice time needed to achieve understanding at an appropriate pace"
    },
    {
      id: "skill-generalisation",
      label: "transferring skills across contexts",
      diagnosisIds: ["id", "asd"],
      description: "lack of adequate opportunities for explicit teaching of skill transfer needed for students to apply learned strategies across different subjects and settings"
    },
    {
      id: "anxiety-participation",
      label: "anxiety impacting participation",
      diagnosisIds: ["social-emotional"],
      description: "additional supports required in the learning environment due to lack of sufficient strategies to reduce anxiety and build confidence needed for active participation"
    },
    {
      id: "emotional-regulation",
      label: "managing emotional responses",
      diagnosisIds: ["social-emotional", "adhd"],
      description: "lack of adequate support in self-regulation strategies and environmental adjustments needed to help students manage emotional responses and maintain engagement"
    },
    {
      id: "vision-access",
      label: "accessing visual information",
      diagnosisIds: ["vision"],
      description: "additional supports required in materials and classroom setup due to lack of sufficient accessible formats and positioning needed for students to access visual information"
    },
    {
      id: "hearing-access",
      label: "accessing spoken information",
      diagnosisIds: ["hearing"],
      description: "lack of adequate environmental adjustments and communication strategies needed to ensure students can access all spoken information in the classroom"
    },
    {
      id: "physical-access",
      label: "physical access to learning spaces",
      diagnosisIds: ["physical"],
      description: "additional supports required in classroom design and planning due to lack of sufficient consideration of physical access needs for furniture, resources, and specialist spaces"
    },
    {
      id: "physical-stamina",
      label: "maintaining stamina across the day",
      diagnosisIds: ["physical"],
      description: "lack of adequate adjustments in task length and scheduling needed to support students with reduced physical stamina or medical needs"
    },
    {
      id: "working-memory",
      label: "holding information in working memory",
      diagnosisIds: ["adhd", "dyslexia", "dld", "id"],
      description: "additional supports required in instructional delivery due to lack of sufficient strategies to reduce cognitive load and support information retention during tasks"
    },

    // ==========================
    // Expanded barrier library
    // ==========================
    {
      id: "processing-speed",
      label: "processing speed in timed tasks",
      diagnosisIds: ["adhd", "dyslexia", "dld", "id"],
      description: "additional supports required in task design and timing due to limited opportunities to adjust pace and reduce time pressure, increasing cognitive load during timed tasks"
    },
    {
      id: "task-initiation",
      label: "starting tasks independently",
      diagnosisIds: ["adhd", "asd", "social-emotional"],
      description: "additional supports required in classroom routines due to lack of clear start cues and supported entry into tasks, limiting independent task initiation"
    },
    {
      id: "transition-between-activities",
      label: "transitions between activities",
      diagnosisIds: ["adhd", "asd"],
      description: "additional supports required in classroom routines due to limited preparation and clear transition steps, impacting the student’s ability to move between activities smoothly"
    },
    {
      id: "following-multi-step-instructions",
      label: "following multi-step instructions",
      diagnosisIds: ["adhd", "dld", "id"],
      description: "additional supports required in instructional delivery due to limited chunking and visual supports, increasing the impact of working memory demands in multi-step instructions"
    },
    {
      id: "attention-to-detail",
      label: "noticing key details in tasks",
      diagnosisIds: ["adhd", "dyslexia"],
      description: "additional supports required in task presentation due to limited highlighting of key details and exemplars, increasing errors where accuracy depends on noticing small details"
    },
    {
      id: "self-regulation-during-learning",
      label: "self-regulation during learning",
      diagnosisIds: ["adhd", "social-emotional", "asd"],
      description: "additional supports required in the learning environment due to limited access to regulation strategies and predictable routines, impacting sustained engagement in learning"
    },
    {
      id: "sensory-noise",
      label: "managing classroom noise",
      diagnosisIds: ["asd", "adhd", "hearing"],
      description: "additional supports required in environmental adjustments due to limited strategies to reduce background noise and provide predictable listening conditions"
    },
    {
      id: "sensory-crowding",
      label: "crowded spaces and proximity",
      diagnosisIds: ["asd", "social-emotional"],
      description: "additional supports required in classroom layout and movement routines due to limited planning for crowding, impacting participation during transitions and group work"
    },
    {
      id: "literal-language",
      label: "interpreting figurative or implied language",
      diagnosisIds: ["asd", "dld"],
      description: "additional supports required in teaching approaches due to limited explicit explanation of figurative language and implied meaning, impacting understanding of classroom communication"
    },
    {
      id: "peer-interaction-structure",
      label: "structured peer interaction",
      diagnosisIds: ["asd", "social-emotional", "dld"],
      description: "additional supports required in classroom participation structures due to limited explicit teaching and supported practice of peer interaction skills"
    },
    {
      id: "group-work-roles",
      label: "clarity of roles in group work",
      diagnosisIds: ["asd", "adhd"],
      description: "additional supports required in learning design due to limited role clarity and structured group processes, impacting participation and shared responsibility in group tasks"
    },
    {
      id: "classroom-language-load",
      label: "language load in lessons",
      diagnosisIds: ["dld", "eald"],
      description: "additional supports required in instructional delivery due to limited reduction of language load and explicit vocabulary support, impacting access to curriculum content"
    },
    {
      id: "word-retrieval",
      label: "word retrieval during speaking",
      diagnosisIds: ["dld", "eald"],
      description: "additional supports required in classroom discussion routines due to limited processing time and supportive prompts, impacting ability to contribute orally"
    },
    {
      id: "phonological-processing",
      label: "phonological processing in literacy tasks",
      diagnosisIds: ["dyslexia", "dld"],
      description: "additional supports required in foundational literacy instruction due to limited structured opportunities to practise sound manipulation and mapping sounds to print"
    },
    {
      id: "handwriting-fatigue",
      label: "handwriting stamina and fatigue",
      diagnosisIds: ["dysgraphia", "physical"],
      description: "additional supports required in task expectations due to limited alternatives to extended handwriting, increasing fatigue and reducing output over time"
    },
    {
      id: "writing-output-volume",
      label: "volume of writing required",
      diagnosisIds: ["dysgraphia", "dyslexia", "id"],
      description: "additional supports required in assessment and task design due to limited alternative response modes, increasing barriers when curriculum tasks rely on extended written output"
    },
    {
      id: "spelling-assessment-impact",
      label: "spelling impacting demonstration of knowledge",
      diagnosisIds: ["dyslexia", "dysgraphia"],
      description: "additional supports required in assessment practices due to limited separation of content knowledge from spelling demands, impacting the student’s ability to demonstrate learning"
    },
    {
      id: "math-language",
      label: "language demands in mathematics",
      diagnosisIds: ["dld", "dyscalculia", "eald"],
      description: "additional supports required in numeracy teaching due to limited explicit teaching of mathematical vocabulary and problem language, impacting understanding of tasks"
    },
    {
      id: "multi-step-problem-solving",
      label: "multi-step problem solving",
      diagnosisIds: ["dyscalculia", "adhd", "id"],
      description: "additional supports required in instructional design due to limited scaffolds and worked examples for multi-step problems, increasing cognitive load during problem solving"
    },
    {
      id: "math-anxiety",
      label: "anxiety during numeracy tasks",
      diagnosisIds: ["social-emotional"],
      description: "additional supports required in the learning environment due to limited strategies to reduce performance pressure and build confidence, impacting engagement in numeracy"
    },
    {
      id: "reading-anxiety",
      label: "anxiety during reading tasks",
      diagnosisIds: ["social-emotional", "dyslexia"],
      description: "additional supports required in classroom participation routines due to limited low-risk opportunities to practise reading, impacting willingness to engage"
    },
    {
      id: "attendance-variation",
      label: "variable attendance impacting continuity",
      diagnosisIds: ["medical", "social-emotional"],
      description: "additional supports required in planning and catch-up structures due to limited continuity in instruction, impacting access to cumulative learning sequences"
    },
    {
      id: "fatigue-medical",
      label: "fatigue impacting sustained work",
      diagnosisIds: ["medical", "physical"],
      description: "additional supports required in scheduling and workload due to limited flexibility in task length and break opportunities, impacting stamina across the day"
    },
    {
      id: "pain-discomfort",
      label: "pain or discomfort impacting participation",
      diagnosisIds: ["medical", "physical"],
      description: "additional supports required in seating, movement and task demands due to limited adjustment for comfort needs, impacting sustained participation"
    },
    {
      id: "medication-timing",
      label: "impact of medication timing",
      diagnosisIds: ["medical"],
      description: "additional supports required in scheduling and check-ins due to limited coordination around medication timing, impacting attention, energy or regulation during lessons"
    },
    {
      id: "vision-board-copying",
      label: "copying from the board",
      diagnosisIds: ["vision", "dysgraphia"],
      description: "additional supports required in access to learning materials due to limited provision of printed or digital copies, impacting tasks that rely on copying from a distance"
    },
    {
      id: "vision-contrast",
      label: "contrast and visual clarity of resources",
      diagnosisIds: ["vision"],
      description: "additional supports required in resource design due to limited high-contrast formatting and clear layouts, impacting visual access to key information"
    },
    {
      id: "hearing-group-discussion",
      label: "accessing group discussion",
      diagnosisIds: ["hearing"],
      description: "additional supports required in discussion routines due to limited repetition, captioning or structured turn-taking, impacting access to peer contributions"
    },
    {
      id: "hearing-in-noise",
      label: "listening in background noise",
      diagnosisIds: ["hearing", "adhd"],
      description: "additional supports required in environmental adjustments due to limited noise reduction strategies and clear speaker cues, impacting listening comprehension"
    },
    {
      id: "eald-vocabulary",
      label: "accessing subject vocabulary (EAL/D)",
      diagnosisIds: ["eald"],
      description: "additional supports required in curriculum and teaching approaches due to limited pre-teaching of key vocabulary and language structures used in subject learning"
    },
    {
      id: "eald-instructions",
      label: "understanding classroom instructions (EAL/D)",
      diagnosisIds: ["eald"],
      description: "additional supports required in instructional delivery due to limited simplification, visuals and modelling, impacting access to classroom instructions"
    },
    {
      id: "eald-assessment-language",
      label: "assessment language demands (EAL/D)",
      diagnosisIds: ["eald"],
      description: "additional supports required in assessment practices due to limited adjustment of language load, impacting demonstration of curriculum knowledge"
    },
    {
      id: "gifted-boredom",
      label: "engagement with repeated content (high potential)",
      diagnosisIds: ["gifted"],
      description: "additional supports required in curriculum differentiation due to limited extension options, impacting engagement when content is repeated without appropriate challenge"
    },
    {
      id: "gifted-perfectionism",
      label: "perfectionism impacting task completion",
      diagnosisIds: ["gifted", "social-emotional"],
      description: "additional supports required in task design due to limited scaffolds for draft work and risk-taking, impacting willingness to attempt unfamiliar tasks"
    },
    {
      id: "gifted-asynchronicity",
      label: "asynchronous skill profile",
      diagnosisIds: ["gifted", "social-emotional"],
      description: "additional supports required in planning due to limited alignment between high potential and skill development needs, impacting participation without targeted scaffolds"
    },
    {
      id: "organisation-planning",
      label: "planning long-term tasks",
      diagnosisIds: ["adhd", "asd"],
      description: "additional supports required in assessment and project planning due to limited chunking, timelines and check-ins, impacting completion of long-term tasks"
    },
    {
      id: "time-management",
      label: "time management during tasks",
      diagnosisIds: ["adhd"],
      description: "additional supports required in classroom structures due to limited visual timing cues and intermediate checkpoints, impacting completion within lesson time"
    },
    {
      id: "note-taking",
      label: "note-taking during instruction",
      diagnosisIds: ["dysgraphia", "adhd", "vision"],
      description: "additional supports required in access to learning content due to limited provision of teacher notes or alternative note-taking supports, impacting participation during instruction"
    },
    {
      id: "reading-comprehension-monitoring",
      label: "monitoring comprehension while reading",
      diagnosisIds: ["dyslexia"],
      description: "additional supports required in teaching methods due to limited explicit teaching of comprehension monitoring strategies, impacting independent reading comprehension"
    },
    {
      id: "writing-sentence-structure",
      label: "sentence structure and grammar in writing",
      diagnosisIds: ["dld", "eald", "dysgraphia"],
      description: "additional supports required in teaching approaches due to limited modelling and sentence-level scaffolds, impacting clarity in written expression"
    },
    {
      id: "writing-cohesion",
      label: "cohesion and paragraphing",
      diagnosisIds: ["dld", "dysgraphia"],
      description: "additional supports required in writing instruction due to limited explicit teaching of cohesion devices and paragraph structure, impacting organisation of written work"
    },
    {
      id: "classroom-safety-cues",
      label: "understanding safety and classroom expectations",
      diagnosisIds: ["asd", "dld", "eald"],
      description: "additional supports required in routines and visuals due to limited explicit teaching of expectations and safety cues, impacting participation in classroom routines"
    },
    {
      id: "recess-structure",
      label: "unstructured times (recess/lunch)",
      diagnosisIds: ["asd", "social-emotional"],
      description: "additional supports required in school routines due to limited structured supports for unstructured times, impacting wellbeing and participation"
    },
    {
      id: "reading-accuracy",
      label: "reading accuracy (word-level)",
      diagnosisIds: ["dyslexia"],
      description: "additional supports required in literacy instruction due to limited structured practice with accurate word reading and feedback at the right instructional level"
    },
    {
      id: "multisyllabic-words",
      label: "reading multisyllabic words",
      diagnosisIds: ["dyslexia", "dld"],
      description: "additional supports required in teaching approaches due to limited explicit instruction in syllable patterns and morphological strategies for longer words"
    },
    {
      id: "spelling-morphology",
      label: "spelling using word structure (morphology)",
      diagnosisIds: ["dyslexia", "dysgraphia"],
      description: "additional supports required in spelling instruction due to limited explicit teaching of prefixes, suffixes and base words to support spelling accuracy"
    },
    {
      id: "writing-revision",
      label: "revising and improving drafts",
      diagnosisIds: ["dysgraphia", "adhd", "dld"],
      description: "additional supports required in writing processes due to limited structured revision routines and exemplars, impacting the student’s ability to refine drafts"
    },
    {
      id: "writing-editing-conventions",
      label: "editing for punctuation and conventions",
      diagnosisIds: ["dysgraphia", "dyslexia", "dld"],
      description: "additional supports required in writing instruction due to limited explicit editing checklists and modelling, impacting accuracy of conventions"
    },
    {
      id: "note-organisation",
      label: "organising notes and study materials",
      diagnosisIds: ["adhd", "asd"],
      description: "additional supports required in organisation systems due to limited consistent routines for storing notes and revisiting learning, impacting study readiness"
    },
    {
      id: "study-retrieval-practice",
      label: "retrieving learned information",
      diagnosisIds: ["id", "adhd"],
      description: "additional supports required in teaching approaches due to limited planned retrieval practice and spaced review, impacting recall over time"
    },
    {
      id: "oral-presentation",
      label: "speaking to the class",
      diagnosisIds: ["social-emotional", "dld", "eald"],
      description: "additional supports required in participation routines due to limited low-risk speaking options and rehearsal, impacting willingness to present orally"
    },
    {
      id: "listening-lengthy-instruction",
      label: "listening to lengthy teacher talk",
      diagnosisIds: ["adhd", "dld", "hearing"],
      description: "additional supports required in instructional delivery due to limited chunking, visuals and checks for understanding during extended explanations"
    },
    {
      id: "class-discussion-turn-taking",
      label: "turn-taking in class discussion",
      diagnosisIds: ["asd", "adhd", "dld"],
      description: "additional supports required in discussion routines due to limited explicit turn-taking structures and cues to support participation"
    },
    {
      id: "narrative-structure",
      label: "organising narratives and recounts",
      diagnosisIds: ["dld", "eald", "id"],
      description: "additional supports required in teaching approaches due to limited narrative scaffolds and modelling, impacting structure in oral and written recounts"
    },
    {
      id: "pragmatics-hidden-rules",
      label: "understanding hidden social rules",
      diagnosisIds: ["asd", "dld"],
      description: "additional supports required in explicit teaching due to limited modelling and rehearsal of hidden classroom and playground rules"
    },
    {
      id: "flexible-thinking",
      label: "flexible thinking when plans change",
      diagnosisIds: ["asd", "social-emotional"],
      description: "additional supports required in routines due to limited preparation for change and choice-making, impacting flexibility during unexpected changes"
    },
    {
      id: "sensory-lighting",
      label: "lighting and visual stimulation",
      diagnosisIds: ["asd", "adhd"],
      description: "additional supports required in environmental adjustments due to limited options to reduce lighting glare and visual clutter in learning spaces"
    },
    {
      id: "sensory-textures",
      label: "sensory response to materials",
      diagnosisIds: ["asd"],
      description: "additional supports required in classroom resources due to limited alternative materials and choice, impacting participation in hands-on learning"
    },
    {
      id: "sensory-movement-seeking",
      label: "need for movement to regulate",
      diagnosisIds: ["adhd", "asd"],
      description: "additional supports required in classroom routines due to limited planned movement opportunities, impacting regulation and focus"
    },
    {
      id: "test-anxiety",
      label: "assessment anxiety",
      diagnosisIds: ["social-emotional"],
      description: "additional supports required in assessment conditions due to limited strategies to reduce performance pressure and clarify expectations"
    },
    {
      id: "time-pressure-assessment",
      label: "time pressure in assessment",
      diagnosisIds: ["dyslexia", "adhd", "dld"],
      description: "additional supports required in assessment adjustments due to limited time accommodations and alternative formats, increasing barriers under time pressure"
    },
    {
      id: "working-memory-maths",
      label: "working memory load in numeracy tasks",
      diagnosisIds: ["dyscalculia", "adhd", "id"],
      description: "additional supports required in lesson design due to limited scaffolds and recording supports, increasing cognitive load in multi-step numeracy tasks"
    },
    {
      id: "number-line-concepts",
      label: "using number lines and magnitude",
      diagnosisIds: ["dyscalculia", "id"],
      description: "additional supports required in numeracy instruction due to limited concrete and visual experiences to build magnitude and number line understanding"
    },
    {
      id: "fractions-visual",
      label: "fractions and proportional reasoning",
      diagnosisIds: ["dyscalculia", "dld"],
      description: "additional supports required in teaching approaches due to limited visual models and language supports for fractions and proportional reasoning"
    },
    {
      id: "math-symbols-meaning",
      label: "interpreting mathematical symbols",
      diagnosisIds: ["dyscalculia", "eald"],
      description: "additional supports required in instruction due to limited explicit teaching of symbol meaning and worked examples"
    },
    {
      id: "math-word-problems",
      label: "solving word problems",
      diagnosisIds: ["dld", "dyscalculia", "eald"],
      description: "additional supports required in numeracy teaching due to limited scaffolds for problem language and visual representations"
    },
    {
      id: "measurement-units",
      label: "using measurement units",
      diagnosisIds: ["dyscalculia", "id", "eald"],
      description: "additional supports required in teaching approaches due to limited hands-on practice and explicit language support for measurement units"
    },
    {
      id: "time-and-schedules",
      label: "understanding time and schedules",
      diagnosisIds: ["dyscalculia", "adhd", "id"],
      description: "additional supports required in classroom routines due to limited visual schedules and explicit teaching of time concepts"
    },
    {
      id: "money-and-financial-literacy",
      label: "money concepts and financial tasks",
      diagnosisIds: ["dyscalculia", "id"],
      description: "additional supports required in teaching approaches due to limited concrete practice and visual supports for money concepts"
    },
    {
      id: "geometry-spatial",
      label: "spatial reasoning in geometry",
      diagnosisIds: ["dyscalculia", "vision"],
      description: "additional supports required in teaching approaches due to limited concrete models and visual clarity when tasks rely on spatial reasoning"
    },
    {
      id: "graphing-and-data",
      label: "interpreting graphs and data displays",
      diagnosisIds: ["dyscalculia", "vision", "dld"],
      description: "additional supports required in instruction due to limited explicit teaching of graph features and accessible formats"
    },
    {
      id: "attention-during-independent-work",
      label: "staying on task during independent work",
      diagnosisIds: ["adhd"],
      description: "additional supports required in learning routines due to limited checkpoints, clear goals and structured work cycles during independent tasks"
    },
    {
      id: "task-monitoring",
      label: "monitoring progress during tasks",
      diagnosisIds: ["adhd", "id"],
      description: "additional supports required in task structures due to limited interim goals and checklists, impacting the student’s ability to monitor progress"
    },
    {
      id: "error-checking",
      label: "checking work for errors",
      diagnosisIds: ["adhd", "dyslexia", "dyscalculia"],
      description: "additional supports required in teaching approaches due to limited explicit error-checking routines and worked examples"
    },
    {
      id: "staying-seated",
      label: "remaining settled during learning",
      diagnosisIds: ["adhd", "asd"],
      description: "additional supports required in classroom routines due to limited planned movement and flexible seating options to support regulation"
    },
    {
      id: "wait-time",
      label: "wait time before responding",
      diagnosisIds: ["adhd", "dld"],
      description: "additional supports required in teacher questioning routines due to limited structured wait time and response supports, impacting participation"
    },
    {
      id: "copying-speed",
      label: "copying speed and accuracy",
      diagnosisIds: ["dysgraphia", "vision", "adhd"],
      description: "additional supports required in access to materials due to limited alternatives to copying, impacting tasks that rely on fast copying"
    },
    {
      id: "fine-motor-cutting",
      label: "fine motor skills for tools (scissors/rulers)",
      diagnosisIds: ["physical", "dysgraphia"],
      description: "additional supports required in task design due to limited adaptive tools and alternatives when activities rely on fine motor tool use"
    },
    {
      id: "gross-motor-participation",
      label: "participating in practical activities",
      diagnosisIds: ["physical"],
      description: "additional supports required in lesson planning due to limited adaptations for practical and movement-based activities"
    },
    {
      id: "handwriting-posture-grip",
      label: "handwriting posture and grip",
      diagnosisIds: ["physical", "dysgraphia"],
      description: "additional supports required in classroom setup due to limited ergonomic supports and explicit instruction for efficient handwriting posture"
    },
    {
      id: "keyboarding-skills",
      label: "using keyboarding efficiently",
      diagnosisIds: ["dysgraphia", "physical"],
      description: "additional supports required in access to assistive technology due to limited explicit instruction and practice in keyboarding skills"
    },
    {
      id: "assistive-technology-navigation",
      label: "navigating digital tools and platforms",
      diagnosisIds: ["id", "dyslexia", "vision"],
      description: "additional supports required in digital access due to limited explicit teaching of platform navigation and consistent tool routines"
    },
    {
      id: "digital-organisation",
      label: "organising digital files and submissions",
      diagnosisIds: ["adhd", "asd"],
      description: "additional supports required in classroom systems due to limited consistent file naming, submission routines and reminders"
    },
    {
      id: "vision-fatigue",
      label: "visual fatigue during close work",
      diagnosisIds: ["vision"],
      description: "additional supports required in scheduling and material access due to limited breaks and accessible formats during sustained close work"
    },
    {
      id: "hearing-rapid-speech",
      label: "accessing rapid speech",
      diagnosisIds: ["hearing", "eald"],
      description: "additional supports required in communication routines due to limited pacing, repetition and visual supports during instruction"
    },
    {
      id: "captions-and-transcripts",
      label: "captions for video/audio learning",
      diagnosisIds: ["hearing"],
      description: "additional supports required in resource selection due to limited use of captions and transcripts to support access to multimedia content"
    },
    {
      id: "classroom-acoustics",
      label: "classroom acoustics and echo",
      diagnosisIds: ["hearing"],
      description: "additional supports required in environmental adjustments due to limited consideration of acoustics, impacting clarity of spoken information"
    },
    {
      id: "reading-visual-tracking",
      label: "visual tracking across text",
      diagnosisIds: ["vision", "dyslexia"],
      description: "additional supports required in literacy access due to limited use of accessible formats and tracking supports when reading dense text"
    },
    {
      id: "academic-language",
      label: "academic language in subject areas",
      diagnosisIds: ["eald", "dld"],
      description: "additional supports required in teaching approaches due to limited explicit instruction in academic language structures used in subject learning"
    },
    {
      id: "cultural-references",
      label: "cultural references in texts and tasks",
      diagnosisIds: ["eald"],
      description: "additional supports required in curriculum access due to limited unpacking of cultural references and background knowledge embedded in tasks"
    },
    {
      id: "classroom-discussion-eald",
      label: "participating in discussion (EAL/D)",
      diagnosisIds: ["eald"],
      description: "additional supports required in participation routines due to limited rehearsal, sentence frames and low-risk participation options"
    },
    {
      id: "reading-background-knowledge",
      label: "background knowledge for texts",
      diagnosisIds: ["eald", "dld"],
      description: "additional supports required in curriculum access due to limited pre-teaching of concepts and context needed to understand texts"
    },
    {
      id: "school-belonging",
      label: "sense of belonging in the classroom",
      diagnosisIds: ["social-emotional"],
      description: "additional supports required in classroom culture due to limited inclusive routines and supported peer connections, impacting engagement and participation"
    },
    {
      id: "peer-conflict-resolution",
      label: "resolving peer conflict",
      diagnosisIds: ["social-emotional", "asd"],
      description: "additional supports required in social learning due to limited explicit teaching and rehearsal of conflict resolution strategies"
    },
    {
      id: "recovery-after-incident",
      label: "re-engaging after difficult moments",
      diagnosisIds: ["social-emotional", "adhd"],
      description: "additional supports required in classroom routines due to limited structured re-entry supports after dysregulation or conflict"
    },
    {
      id: "medical-appointments",
      label: "learning interruptions due to appointments",
      diagnosisIds: ["medical"],
      description: "additional supports required in planning due to limited catch-up structures and flexible timelines when lessons are missed"
    },
    {
      id: "catch-up-after-absence",
      label: "catch-up after absence",
      diagnosisIds: ["medical"],
      description: "additional supports required in classroom systems due to limited consistent catch-up routines and access to missed materials"
    },
    {
      id: "toileting-access",
      label: "access to breaks and health needs",
      diagnosisIds: ["medical"],
      description: "additional supports required in classroom routines due to limited flexibility for health-related breaks, impacting participation"
    },
    {
      id: "gifted-pace-and-depth",
      label: "pace and depth of learning (high potential)",
      diagnosisIds: ["gifted"],
      description: "additional supports required in curriculum differentiation due to limited opportunities for depth, complexity and faster pacing where appropriate"
    },
    {
      id: "gifted-social-fit",
      label: "peer fit and social connection (high potential)",
      diagnosisIds: ["gifted", "social-emotional"],
      description: "additional supports required in classroom grouping and wellbeing routines due to limited opportunities for appropriate peer connection and collaboration"
    },
    {
      id: "gifted-executive-skills",
      label: "executive skills with complex projects (high potential)",
      diagnosisIds: ["gifted", "adhd"],
      description: "additional supports required in project planning due to limited scaffolds for complex tasks, impacting completion despite high potential"
    },
    {
      id: "reading-volume",
      label: "volume of reading required",
      diagnosisIds: ["dyslexia", "dld"],
      description: "additional supports required in curriculum access due to limited alternative formats and pacing adjustments when tasks require a high volume of reading"
    },
    {
      id: "reading-assessment-access",
      label: "accessing reading-based assessments",
      diagnosisIds: ["dyslexia", "eald", "dld"],
      description: "additional supports required in assessment practices due to limited adjustments to reading load, impacting demonstration of content knowledge"
    },
    {
      id: "writing-copying-board",
      label: "copying and rewriting text in writing tasks",
      diagnosisIds: ["dysgraphia", "adhd"],
      description: "additional supports required in task design due to limited provision of templates and digital copies, increasing barriers when tasks rely on copying or rewriting"
    },
    {
      id: "keyboard-accessibility",
      label: "accessibility features for digital tasks",
      diagnosisIds: ["vision", "physical", "dyslexia"],
      description: "additional supports required in digital access due to limited use of accessibility features (zoom, dictation, read-aloud) for learning tasks"
    },
    {
      id: "sensory-smell",
      label: "sensitivity to smells or strong scents",
      diagnosisIds: ["asd", "social-emotional"],
      description: "additional supports required in environmental planning due to limited strategies to reduce exposure to strong scents, impacting comfort and participation"
    },
    {
      id: "sensory-temperature",
      label: "temperature and comfort needs",
      diagnosisIds: ["asd", "medical"],
      description: "additional supports required in classroom environment due to limited adjustments for comfort, impacting regulation and sustained attention"
    },
    {
      id: "unexpected-noises",
      label: "unexpected noises and alarms",
      diagnosisIds: ["asd", "social-emotional"],
      description: "additional supports required in preparation and safety routines due to limited rehearsal and coping strategies for unexpected noises"
    },
    {
      id: "task-choice-overload",
      label: "managing too many choices",
      diagnosisIds: ["asd", "adhd", "social-emotional"],
      description: "additional supports required in task design due to limited structured choices and decision supports, impacting task initiation"
    },
    {
      id: "independent-reading-selection",
      label: "selecting appropriate texts",
      diagnosisIds: ["dyslexia", "asd"],
      description: "additional supports required in classroom library access due to limited guided text selection and interest-matched options at appropriate readability"
    },
    {
      id: "library-navigation",
      label: "navigating classroom resources",
      diagnosisIds: ["id", "asd"],
      description: "additional supports required in classroom organisation due to limited consistent labels and routines, impacting independent access to resources"
    },
    {
      id: "copying-peer-work",
      label: "accessing peer explanations",
      diagnosisIds: ["hearing", "dld"],
      description: "additional supports required in collaborative routines due to limited structured turn-taking and summarising of peer contributions"
    },
    {
      id: "oral-instructions-distance",
      label: "accessing instructions from a distance",
      diagnosisIds: ["hearing", "adhd"],
      description: "additional supports required in classroom communication due to limited proximity, face-to-face cues and repetition of key instructions"
    },
    {
      id: "task-anxiety-starting",
      label: "anxiety about starting tasks",
      diagnosisIds: ["social-emotional"],
      description: "additional supports required in entry routines due to limited reassurance, rehearsal and clear success criteria to reduce task-start anxiety"
    },
    {
      id: "reading-aloud-pressure",
      label: "pressure when reading aloud",
      diagnosisIds: ["dyslexia", "social-emotional"],
      description: "additional supports required in participation routines due to limited low-risk alternatives to reading aloud, impacting willingness to participate"
    },
    {
      id: "peer-models",
      label: "access to models and exemplars",
      diagnosisIds: ["id", "dld", "eald"],
      description: "additional supports required in teaching approaches due to limited exemplars and modelled responses, impacting clarity of expectations"
    },
    {
      id: "rubrics-success-criteria",
      label: "understanding success criteria",
      diagnosisIds: ["adhd", "asd", "dld", "eald"],
      description: "additional supports required in assessment clarity due to limited explicit success criteria and examples, impacting task completion and quality"
    },
    {
      id: "classroom-technology-reliability",
      label: "reliable access to technology",
      diagnosisIds: ["dysgraphia", "vision", "physical"],
      description: "additional supports required in planning due to limited reliable access to devices and assistive tools, impacting consistent use of adjustments"
    },
    {
      id: "medical-emergency-plan",
      label: "clarity of health and safety plans",
      diagnosisIds: ["medical"],
      description: "additional supports required in school routines due to limited clarity and rehearsal of health and safety plans, impacting safe participation"
    },
    {
      id: "medical-hydration",
      label: "hydration and nutrition needs",
      diagnosisIds: ["medical"],
      description: "additional supports required in classroom routines due to limited planned access to hydration and nutrition, impacting stamina and participation"
    },
    {
      id: "writing-assistive-setup",
      label: "setting up assistive tools quickly",
      diagnosisIds: ["dysgraphia", "physical"],
      description: "additional supports required in classroom routines due to limited streamlined setup of assistive tools, impacting task initiation"
    },
    {
      id: "sensory-tools-access",
      label: "access to agreed regulation tools",
      diagnosisIds: ["asd", "adhd", "social-emotional"],
      description: "additional supports required in classroom routines due to limited consistent access to agreed regulation tools, impacting engagement"
    },
    {
      id: "assignment-checkpoints",
      label: "checkpointing assignments",
      diagnosisIds: ["adhd", "asd"],
      description: "additional supports required in assessment routines due to limited interim checkpoints and feedback cycles, impacting completion"
    },
    {
      id: "classroom-entry-routine",
      label: "starting the lesson (entry routine)",
      diagnosisIds: ["adhd", "asd", "social-emotional"],
      description: "additional supports required in classroom routines due to limited consistent entry tasks and clear expectations, impacting lesson start"
    }
  ],

  // Default adjustment templates (used when a barrier does not have a specific barrierAdjustments entry)
  adjustmentTemplates: {
    general: [
      { title: "Chunked instructions with visuals", text: "will break instructions into short, sequenced steps with visuals and check-ins for {studentName}." },
      { title: "Reduced workload (same learning intent)", text: "will reduce the length of tasks for {studentName} while maintaining the core learning intention." },
      { title: "Alternative ways to demonstrate learning", text: "will provide {studentName} with alternative response modes (oral, visual, digital) to demonstrate understanding." },
      { title: "Preview and rehearsal", text: "will provide {studentName} with a preview of upcoming tasks and worked examples to clarify expectations." },
      { title: "Check-in / check-out", text: "will use brief check-in and check-out routines with {studentName} to clarify expectations and remove barriers to participation." }
    ],
    adhd: [
      { title: "Planned movement breaks", text: "will include planned movement or regulation breaks for {studentName} to support attention and self-regulation." },
      { title: "Visual timing and checkpoints", text: "will provide {studentName} with visual timing cues and checkpoints to support task completion." },
      { title: "Low-distraction workspace", text: "will provide {studentName} access to a low-distraction workspace and planned seating." }
    ],
    asd: [
      { title: "Visual schedule and predictable routines", text: "will use a visual timetable and predictable routines for {studentName} to support transitions." },
      { title: "Sensory and environmental adjustments", text: "will implement agreed sensory and environmental adjustments for {studentName} to support regulation." },
      { title: "Explicit social expectations", text: "will explicitly teach social expectations for {studentName} using rehearsal and supported practice." }
    ],
    dld: [
      { title: "Simplified language and processing time", text: "will simplify oral language, provide extra processing time and check understanding with {studentName}." },
      { title: "Pre-teaching key vocabulary", text: "will pre-teach key vocabulary and concepts to {studentName} using visuals and examples." },
      { title: "Sentence starters and modelling", text: "will provide {studentName} with sentence starters and modelled examples to support expressive language." }
    ],
    dyslexia: [
      { title: "Audio / read-aloud access", text: "will provide {studentName} access to texts via audio or read-aloud support to reduce decoding load." },
      { title: "Explicit decoding and practice", text: "will provide {studentName} with structured decoding practice and feedback using instructional-level texts." },
      { title: "Extra time for reading tasks", text: "will allow additional time for {studentName} to complete reading-based tasks." }
    ],
    dysgraphia: [
      { title: "Assistive technology for writing", text: "will provide {studentName} access to keyboarding or speech-to-text to reduce handwriting demands." },
      { title: "Writing templates and organisers", text: "will provide {studentName} with writing templates and organisers to support planning and structure." },
      { title: "Reduced handwriting load", text: "will reduce handwriting load for {studentName} while maintaining the learning goal." }
    ],
    dyscalculia: [
      { title: "Concrete and visual representations", text: "will use concrete materials and visual models with {studentName} before moving to abstract symbols." },
      { title: "Worked examples and guided practice", text: "will provide {studentName} with worked examples and guided practice for multi-step problems." },
      { title: "Fact supports to reduce load", text: "will provide {studentName} with fact charts or calculators when tasks require heavy fact recall." }
    ],
    "social-emotional": [
      { title: "Low-risk participation options", text: "will provide {studentName} with low-risk ways to participate (pair-share, written rehearsal, choice) to reduce anxiety." },
      { title: "Clear routines and calming strategies", text: "will implement clear routines and agreed calming strategies with {studentName} to support regulation." },
      { title: "Adult check-ins for wellbeing", text: "will use planned check-ins with {studentName} to monitor wellbeing and support participation." }
    ],
    vision: [
      { title: "Accessible formats", text: "will provide {studentName} with accessible formats (large print, high contrast, digital zoom) for learning materials." },
      { title: "Strategic positioning", text: "will position {studentName} to support access to visual information and reduce copying demands." }
    ],
    hearing: [
      { title: "Optimised listening conditions", text: "will reduce background noise, face {studentName} when speaking and repeat key peer contributions." },
      { title: "Support with hearing technology", text: "will support {studentName} to use hearing technology as recommended and ensure clear communication routines." }
    ],
    physical: [
      { title: "Accessible workspace and materials", text: "will adjust the classroom workspace and access to materials for {studentName} to support participation." },
      { title: "Alternative response modes", text: "will provide {studentName} with alternative response modes to reduce physical demands." }
    ],
    medical: [
      { title: "Flexible scheduling and breaks", text: "will provide flexible scheduling and planned breaks for {studentName} to support stamina and wellbeing." },
      { title: "Workload adjustments", text: "will adjust workload and deadlines for {studentName} to maintain access during periods of fatigue or absence." }
    ],
    eald: [
      { title: "Visuals and modelling", text: "will use visuals, modelling and examples to support {studentName} to access instructions and tasks." },
      { title: "Explicit vocabulary teaching", text: "will explicitly teach key subject vocabulary to {studentName} and provide word banks where needed." }
    ],
    gifted: [
      { title: "Curriculum extension options", text: "will provide extension and choice options for {studentName} to ensure appropriate challenge and engagement." },
      { title: "Drafting and feedback routines", text: "will provide structured drafting and feedback routines for {studentName} to support risk-taking and task completion." }
    ]
  },

  // Adjustments linked to barriers
  barrierAdjustments: {
    "reading-fluency": [
      { title: "Timed Reading Practice", text: "will provide {studentName} with timed reading practice sessions to support reading rate and accuracy." },
      { title: "Repeated Reading Activities", text: "will implement repeated reading activities for {studentName} using age-appropriate texts at instructional level." },
      { title: "Fluency Progress Monitoring", text: "will use fluency charts and progress monitoring with {studentName} to track words correct per minute (WCPM) improvements." }
    ],
    "comprehension": [
      { title: "Explicit Comprehension Strategies", text: "will teach {studentName} explicit comprehension strategies including predicting, questioning, and summarising." },
      { title: "Graphic Organisers and Visual Aids", text: "will provide {studentName} with graphic organisers and visual aids to support understanding of text structure." },
      { title: "Think-Aloud Strategies", text: "will implement think-aloud strategies with {studentName} to model comprehension processes during reading." }
    ],
    "decoding": [
      { title: "Systematic Phonics Instruction", text: "will provide {studentName} with systematic phonics instruction targeting specific decoding patterns." },
      { title: "Word-Building Activities", text: "will use word-building activities and phonemic awareness tasks with {studentName} to strengthen decoding skills." },
      { title: "Multisensory Approaches", text: "will implement multisensory approaches for {studentName} to support letter-sound relationships and word recognition." }
    ],
    "vocabulary": [
      { title: "Pre-Teaching Vocabulary", text: "will pre-teach key vocabulary words to {studentName} before reading activities to support comprehension." },
      { title: "Vocabulary Journals and Word Maps", text: "will provide {studentName} with vocabulary journals and word maps to build understanding of new terms." },
      { title: "Context Clues and Word Analysis", text: "will use context clues and word analysis strategies with {studentName} to expand vocabulary knowledge." }
    ],
    "engagement": [
      { title: "Choice-Based Reading Activities", text: "will implement choice-based reading activities for {studentName} to increase motivation and participation." },
      { title: "Positive Reinforcement and Tracking", text: "will use positive reinforcement and engagement tracking with {studentName} to monitor participation levels." },
      { title: "Interest-Matched Texts", text: "will provide {studentName} with age-appropriate and interest-matched texts to improve engagement during reading sessions." }
    ],
    "confidence": [
      { title: "Supportive Reading Environment", text: "will create a supportive reading environment for {studentName} with opportunities for success and positive feedback." },
      { title: "Peer Reading Activities", text: "will implement peer reading activities for {studentName} to build confidence through collaborative learning." },
      { title: "Gradual Release Strategies", text: "will use gradual release strategies with {studentName}, starting with supported reading and moving towards independence." }
    ],
    "phonemic-awareness": [
      { title: "Phoneme Segmentation Activities", text: "will provide {studentName} with phoneme segmentation activities to support sound identification and manipulation." },
      { title: "Rhyming and Alliteration Tasks", text: "will implement rhyming and alliteration tasks with {studentName} to develop phonological awareness skills." },
      { title: "Sound Blending Practice", text: "will use sound blending practice with {studentName} to support the connection between sounds and words." }
    ],
    "reading-stamina": [
      { title: "Gradual Reading Time Extension", text: "will gradually extend reading time for {studentName} to build stamina and sustained attention." },
      { title: "Reading Breaks and Movement", text: "will provide {studentName} with structured reading breaks and movement activities to maintain focus during longer sessions." },
      { title: "Stamina Tracking Charts", text: "will use stamina tracking charts with {studentName} to monitor and celebrate progress in reading duration." }
    ],
    "text-structure": [
      { title: "Text Type Exploration", text: "will explore different text types with {studentName} including narrative, informational, and persuasive structures." },
      { title: "Text Feature Identification", text: "will teach {studentName} to identify and use text features such as headings, captions, and diagrams to support comprehension." },
      { title: "Structure Mapping Activities", text: "will implement structure mapping activities with {studentName} to visualise and understand text organisation." }
    ],
    "inference-skills": [
      { title: "Inference Questioning Strategies", text: "will teach {studentName} inference questioning strategies to draw conclusions from text evidence." },
      { title: "Picture and Context Clues", text: "will use picture and context clues with {studentName} to support inference-making during reading." },
      { title: "Inference Practice with Familiar Texts", text: "will provide {studentName} with inference practice using familiar texts to build confidence in drawing conclusions." }
    ],
    "self-monitoring": [
      { title: "Self-Correction Strategies", text: "will teach {studentName} self-correction strategies to identify and fix errors independently during reading." },
      { title: "Comprehension Checking Techniques", text: "will implement comprehension checking techniques with {studentName} to monitor understanding while reading." },
      { title: "Reading Reflection Prompts", text: "will use reading reflection prompts with {studentName} to develop metacognitive awareness of reading processes." }
    ],
    "writing-connection": [
      { title: "Reading-Writing Integration", text: "will integrate reading and writing activities for {studentName} to reinforce literacy skills across both domains." },
      { title: "Text Response Writing", text: "will provide {studentName} with opportunities to write responses to texts to deepen comprehension and make connections." },
      { title: "Shared Reading and Writing", text: "will implement shared reading and writing experiences with {studentName} to model connections between reading and writing." }
    ],
    "handwriting-speed": [
      { title: "Fine Motor Supports", text: "will provide {studentName} with fine motor supports including pencil grips, sloped boards, and alternative paper to reduce handwriting effort." },
      { title: "Assistive Technology for Writing", text: "will implement assistive technology options for {studentName} such as keyboards or speech-to-text to reduce handwriting demands." },
      { title: "Reduced Writing Load", text: "will adjust writing expectations for {studentName} by reducing the amount of written work required while maintaining learning outcomes." }
    ],
    "writing-organisation": [
      { title: "Writing Scaffolds and Templates", text: "will provide {studentName} with writing scaffolds including sentence starters and visual organisers to support text structure." },
      { title: "Step-by-Step Planning Checklists", text: "will use step-by-step planning checklists with {studentName} to break down writing tasks into manageable stages." },
      { title: "Pre-Teaching of Writing Structures", text: "will pre-teach writing structures and provide exemplars for {studentName} to model organisation and language features." }
    ],
    "spelling-accuracy": [
      { title: "Systematic Spelling Instruction", text: "will provide {studentName} with systematic spelling instruction targeting specific patterns and word families." },
      { title: "Assistive Technology for Spelling", text: "will implement spelling supports for {studentName} including word prediction and spell-check tools as part of regular practice." },
      { title: "Spelling Practice with Overlearning", text: "will use repeated practice and overlearning strategies with {studentName} to consolidate high-frequency word spelling." }
    ],
    "number-sense": [
      { title: "Concrete and Visual Representations", text: "will provide {studentName} with regular use of concrete materials and visual models before moving to abstract number work." },
      { title: "Number Line and Visual Supports", text: "will use number lines and visual supports with {studentName} to develop understanding of quantity and place value." },
      { title: "Extended Practice with Manipulatives", text: "will implement extended practice opportunities for {studentName} using manipulatives to build number sense foundations." }
    ],
    "math-facts": [
      { title: "Fact Fluency Practice", text: "will provide {studentName} with regular fact fluency practice using games and timed activities to develop automatic recall." },
      { title: "Visual Supports for Number Facts", text: "will use visual supports and memory strategies with {studentName} to support recall of basic number facts." },
      { title: "Reduced Cognitive Load", text: "will reduce cognitive load for {studentName} by providing fact charts or calculators during problem-solving tasks." }
    ],
    "attention-sustained": [
      { title: "Chunked Instruction with Check-Ins", text: "will break instruction into shorter chunks for {studentName} with regular check-ins to maintain attention and understanding." },
      { title: "Planned Seating and Low-Distraction Workspace", text: "will arrange seating for {studentName} to reduce distractions and provide clear sightlines to instruction." },
      { title: "Movement and Regulation Breaks", text: "will build planned movement breaks into lessons for {studentName} to support attention and self-regulation." }
    ],
    "executive-function": [
      { title: "Step-by-Step Task Checklists", text: "will provide {studentName} with visual checklists to break down multi-step tasks and track completion." },
      { title: "Organisational Supports", text: "will implement organisational supports for {studentName} including material management systems and task previews." },
      { title: "Check-In and Check-Out Routines", text: "will use check-in and check-out routines with {studentName} to clarify expectations and problem-solve barriers to task completion." }
    ],
    "impulsivity": [
      { title: "Visual Schedules and Routines", text: "will provide {studentName} with visual schedules and consistent routines to support anticipation and self-regulation." },
      { title: "Explicit Wait-Time Protocols", text: "will implement explicit wait-time protocols for {studentName} including think-time strategies before responding." },
      { title: "Self-Regulation Strategies", text: "will teach self-regulation strategies to {studentName} including breathing techniques and self-monitoring tools." }
    ],
    "routine-changes": [
      { title: "Visual Timetables and Advance Notice", text: "will provide {studentName} with visual timetables and advance notice of changes to support preparation and adaptation." },
      { title: "Social Stories for Transitions", text: "will use social stories with {studentName} to prepare for transitions and changes to routine." },
      { title: "Sensory and Environmental Adjustments", text: "will implement sensory adjustments for {studentName} including access to quiet spaces and sensory tools during transitions." }
    ],
    "social-communication": [
      { title: "Social Narratives and Role-Play", text: "will provide {studentName} with social narratives and role-play opportunities to explicitly teach social expectations." },
      { title: "Structured Peer Support", text: "will implement structured peer support activities for {studentName} to practise social communication in a supported environment." },
      { title: "Explicit Group Work Instruction", text: "will explicitly teach group work expectations and communication skills to {studentName} before collaborative tasks." }
    ],
    "sensory-processing": [
      { title: "Environmental Adjustments", text: "will adjust lighting, noise levels, and classroom layout for {studentName} to support sensory regulation." },
      { title: "Access to Sensory Tools", text: "will provide {studentName} with access to agreed sensory tools and quiet spaces to support self-regulation." },
      { title: "Planned Sensory Breaks", text: "will build planned sensory breaks into the day for {studentName} to support sustained engagement in learning." }
    ],
    "oral-language-comprehension": [
      { title: "Simplified and Chunked Instructions", text: "will simplify and chunk oral instructions for {studentName} with visual supports and repetition as needed." },
      { title: "Visual Supports for Spoken Information", text: "will provide {studentName} with visual supports including written instructions and visual cues to supplement spoken information." },
      { title: "Face-to-Face Communication", text: "will ensure face-to-face communication with {studentName} and repeat peer contributions to support access to all spoken information." }
    ],
    "expressive-language": [
      { title: "Language Modelling and Recasting", text: "will model target language structures for {studentName} and recast responses to support expressive language development." },
      { title: "Structured Peer Support", text: "will provide {studentName} with structured opportunities to rehearse ideas with peers before whole-group sharing." },
      { title: "Pre-Teaching of Subject Vocabulary", text: "will pre-teach subject-specific vocabulary to {studentName} with visuals and examples to support expressive language use." }
    ],
    "curriculum-pace": [
      { title: "Extended Practice Time", text: "will provide {studentName} with extended practice time and reduced pace to achieve understanding of curriculum content." },
      { title: "Differentiated Content Delivery", text: "will differentiate content delivery for {studentName} breaking complex concepts into smaller, manageable steps." },
      { title: "Alternative Response Modes", text: "will provide {studentName} with alternative ways to demonstrate understanding including oral responses and visual representations." }
    ],
    "skill-generalisation": [
      { title: "Explicit Skill Transfer Teaching", text: "will explicitly teach {studentName} how to transfer learned strategies across different subjects and contexts." },
      { title: "Practice Across Multiple Contexts", text: "will provide {studentName} with opportunities to practise skills across multiple contexts to support generalisation." },
      { title: "Check-In and Review", text: "will use check-in routines with {studentName} to review and apply strategies learned in one context to new situations." }
    ],
    "anxiety-participation": [
      { title: "Task Previews and Preparation", text: "will provide {studentName} with previews of upcoming tasks and assessments to reduce anxiety and build confidence." },
      { title: "Check-In and Check-Out Routines", text: "will implement check-in and check-out routines with {studentName} to monitor wellbeing and problem-solve barriers to participation." },
      { title: "Supportive Peer Structures", text: "will create supportive peer structures for {studentName} including buddy systems and small-group work to reduce anxiety." }
    ],
    "emotional-regulation": [
      { title: "Sensory and Environmental Adjustments", text: "will adjust sensory environment for {studentName} including access to quiet spaces and sensory tools to support emotional regulation." },
      { title: "Movement and Regulation Breaks", text: "will build planned movement and regulation breaks into the day for {studentName} to support emotional self-regulation." },
      { title: "Social Stories and Self-Regulation Strategies", text: "will teach self-regulation strategies to {studentName} including social stories and coping strategies for managing emotions." }
    ],
    "vision-access": [
      { title: "Accessible Format Materials", text: "will provide {studentName} with materials in accessible formats including enlarged print, high-contrast layouts, and digital zoom options." },
      { title: "Strategic Seating and Positioning", text: "will arrange seating and positioning for {studentName} to optimise access to visual information and classroom displays." },
      { title: "Assistive Technology for Vision", text: "will implement assistive technology for {studentName} including screen readers and magnification tools as recommended." }
    ],
    "hearing-access": [
      { title: "Optimised Listening Environment", text: "will optimise listening environment for {studentName} including minimising background noise and ensuring clear sightlines." },
      { title: "Face-to-Face Communication", text: "will ensure face-to-face communication with {studentName} and repeat peer contributions to support access to all spoken information." },
      { title: "Hearing Technology Support", text: "will support {studentName} to use hearing technology as recommended and ensure proper functioning of assistive listening devices." }
    ],
    "physical-access": [
      { title: "Accessible Classroom Design", text: "will arrange classroom furniture and resources for {studentName} to ensure physical access to all learning spaces and materials." },
      { title: "Assistive Technology for Access", text: "will implement assistive technology for {studentName} including alternative input devices and adaptive equipment as needed." },
      { title: "Alternative Response Modes", text: "will provide {studentName} with alternative ways to demonstrate learning that reduce physical demands while maintaining outcomes." }
    ],
    "physical-stamina": [
      { title: "Adjusted Task Length", text: "will adjust task length and expectations for {studentName} to accommodate reduced physical stamina while maintaining learning outcomes." },
      { title: "Scheduled Rest Breaks", text: "will build scheduled rest breaks into the day for {studentName} to support stamina and manage fatigue." },
      { title: "Flexible Scheduling", text: "will provide flexible scheduling options for {studentName} including part-day attendance or reduced workload as needed." }
    ],
    "working-memory": [
      { title: "Chunked Instructions with Visual Supports", text: "will break instructions into smaller chunks for {studentName} with visual supports and checklists to reduce working memory load." },
      { title: "Visual Timetables and Reminders", text: "will provide {studentName} with visual timetables and reminder systems to support information retention and task completion." },
      { title: "Extended Practice with Repetition", text: "will provide extended practice opportunities for {studentName} with repetition and overlearning to support skill consolidation." }
    ]
  },

  // Strategy descriptions for adjustment notes section
  strategies: {
    "fluency": "Teacher implemented timed reading practice sessions to address literacy barriers for {studentName}. Student engaged in regular fluency assessments with immediate feedback on reading rate and accuracy.",
    "comprehension": "Teacher implemented comprehension strategy instruction to address literacy barriers for {studentName}. Student practised identifying main ideas, making inferences, and summarising text passages.",
    "engagement": "Teacher implemented engagement pulse monitoring to address literacy barriers for {studentName}. Student provided regular feedback on focus, participation, and confidence levels during intervention sessions.",
    "baseline": "Teacher implemented baseline assessment and progress tracking to address literacy barriers for {studentName}. Student's literacy skills were measured using standardised instruments and monitored over time.",
    "sessions": "Teacher implemented regular intervention sessions to address literacy barriers for {studentName}. Student participated in structured literacy support sessions with targeted skill development.",
    "scaffolding": "Teacher implemented scaffolded reading support to address literacy barriers for {studentName}. Student received differentiated instruction with appropriate level texts and guided practice.",
    "feedback": "Teacher implemented immediate feedback and correction strategies to address literacy barriers for {studentName}. Student received real-time support during reading activities to improve accuracy.",
    "goal-setting": "Teacher implemented individual goal setting to address literacy barriers for {studentName}. Student worked towards personalised literacy targets with regular progress monitoring.",
    "repeated-reading": "Teacher implemented repeated reading activities to address literacy barriers for {studentName}. Student practised reading age-appropriate texts at instructional level multiple times to improve fluency and accuracy.",
    "fluency-monitoring": "Teacher implemented fluency progress monitoring to address literacy barriers for {studentName}. Student's reading rate was tracked using fluency charts to measure words correct per minute (WCPM) improvements over time.",
    "explicit-comprehension": "Teacher implemented explicit comprehension strategies to address literacy barriers for {studentName}. Student learnt and practised predicting, questioning, and summarising techniques to improve text understanding.",
    "graphic-organisers": "Teacher implemented graphic organisers and visual aids to address literacy barriers for {studentName}. Student used visual tools to support understanding of text structure and organise information.",
    "think-aloud": "Teacher implemented think-aloud strategies to address literacy barriers for {studentName}. Student observed and practised comprehension processes through modelled thinking during reading activities.",
    "phonics-instruction": "Teacher implemented systematic phonics instruction to address literacy barriers for {studentName}. Student received targeted instruction on specific decoding patterns to improve word recognition.",
    "word-building": "Teacher implemented word-building activities to address literacy barriers for {studentName}. Student engaged in phonemic awareness tasks to strengthen decoding skills and word construction.",
    "multisensory": "Teacher implemented multisensory approaches to address literacy barriers for {studentName}. Student used multiple senses to support letter-sound relationships and improve word recognition.",
    "vocabulary-preteaching": "Teacher implemented pre-teaching vocabulary to address literacy barriers for {studentName}. Key vocabulary words were introduced before reading activities to support comprehension.",
    "vocabulary-journals": "Teacher implemented vocabulary journals and word maps to address literacy barriers for {studentName}. Student built understanding of new terms through structured vocabulary activities.",
    "context-clues": "Teacher implemented context clues and word analysis strategies to address literacy barriers for {studentName}. Student expanded vocabulary knowledge by analysing words within text context.",
    "choice-reading": "Teacher implemented choice-based reading activities to address literacy barriers for {studentName}. Student selected texts of interest to increase motivation and participation in reading.",
    "positive-reinforcement": "Teacher implemented positive reinforcement and engagement tracking to address literacy barriers for {studentName}. Student participation levels were monitored and celebrated to maintain engagement.",
    "interest-texts": "Teacher implemented interest-matched texts to address literacy barriers for {studentName}. Student received age-appropriate texts aligned with personal interests to improve engagement during reading sessions.",
    "supportive-environment": "Teacher created a supportive reading environment to address literacy barriers for {studentName}. Student experienced opportunities for success and positive feedback to build reading confidence.",
    "peer-reading": "Teacher implemented peer reading activities to address literacy barriers for {studentName}. Student built confidence through collaborative learning experiences with peers.",
    "gradual-release": "Teacher implemented gradual release strategies to address literacy barriers for {studentName}. Student progressed from supported reading towards independence through scaffolded instruction.",
    "phoneme-segmentation": "Teacher implemented phoneme segmentation activities to address literacy barriers for {studentName}. Student developed sound identification and manipulation skills to support early reading.",
    "reading-stamina": "Teacher implemented reading stamina building activities to address literacy barriers for {studentName}. Student gradually extended reading time to build sustained focus and attention.",
    "text-structure": "Teacher implemented text structure exploration to address literacy barriers for {studentName}. Student learnt to identify and navigate different text types including narrative, informational, and persuasive structures.",
    "inference-skills": "Teacher implemented inference questioning strategies to address literacy barriers for {studentName}. Student learnt to draw conclusions from text evidence and understand implicit meaning.",
    "self-correction": "Teacher implemented self-correction strategies to address literacy barriers for {studentName}. Student developed skills to independently identify and fix errors during reading.",
    "reading-writing": "Teacher implemented reading-writing integration to address literacy barriers for {studentName}. Student engaged in activities that reinforced literacy skills across both reading and writing domains."
  },

  // Labels for adjustment dropdown (extracted from this JSON file)
  strategyLabels: {
    "fluency": "fluency practice with timed reading",
    "comprehension": "comprehension strategy instruction",
    "engagement": "engagement pulse monitoring",
    "baseline": "baseline assessment and tracking",
    "sessions": "regular intervention sessions",
    "scaffolding": "scaffolded reading support",
    "feedback": "immediate feedback and correction",
    "goal-setting": "individual goal setting",
    "repeated-reading": "repeated reading activities",
    "fluency-monitoring": "fluency progress monitoring",
    "explicit-comprehension": "explicit comprehension strategies",
    "graphic-organisers": "graphic organisers and visual aids",
    "think-aloud": "think-aloud strategies",
    "phonics-instruction": "systematic phonics instruction",
    "word-building": "word-building activities",
    "multisensory": "multisensory approaches",
    "vocabulary-preteaching": "pre-teaching vocabulary",
    "vocabulary-journals": "vocabulary journals and word maps",
    "context-clues": "context clues and word analysis",
    "choice-reading": "choice-based reading activities",
    "positive-reinforcement": "positive reinforcement and tracking",
    "interest-texts": "interest-matched texts",
    "supportive-environment": "supportive reading environment",
    "peer-reading": "peer reading activities",
    "gradual-release": "gradual release strategies",
    "phoneme-segmentation": "phoneme segmentation activities",
    "reading-stamina": "reading stamina building",
    "text-structure": "text structure exploration",
    "inference-skills": "inference questioning strategies",
    "self-correction": "self-correction strategies",
    "reading-writing": "reading-writing integration"
  },

  engagementDescriptors: {
    "high": "Student demonstrated high levels of engagement and active participation",
    "moderate": "Student showed moderate engagement with consistent participation",
    "developing": "Student engagement is developing with increasing participation over time",
    "low": "Student engagement was low, requiring additional support and encouragement"
  },

  outcomeDescriptors: {
    "improved-skills": "This adjustment resulted in measurable improvements in {studentName}'s literacy skills, with evidence of progress in targeted areas.",
    "increased-confidence": "This adjustment supported {studentName} to develop greater confidence and willingness to engage with reading tasks.",
    "enhanced-engagement": "This adjustment led to increased engagement and participation from {studentName} during literacy intervention sessions.",
    "better-comprehension": "This adjustment enabled {studentName} to demonstrate improved understanding and comprehension of text materials.",
    "progress-towards-goals": "This adjustment supported {studentName} to make progress towards their individualised literacy goals.",
    "positive-behaviour": "This adjustment contributed to more positive learning behaviours and attitudes towards reading for {studentName}.",
    "skill-consolidation": "This adjustment allowed {studentName} to consolidate and apply literacy skills across different contexts.",
    "independence": "This adjustment supported {studentName} to develop greater independence in applying literacy strategies."
  }
};
