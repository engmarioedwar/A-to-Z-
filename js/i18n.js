/* ═══════════════════════════════════════════════════════════
   AIDS SOC Platform  —  i18n.js
   AR / EN translations — no external library
═══════════════════════════════════════════════════════════ */

const TRANSLATIONS = {
  en: {
    /* ── Carousel labels ── */
    block1_label:     "SOC OVERVIEW",
    block2_label:     "AI PIPELINE",
    block3_label:     "AI COPILOT",
    click_enter:      "CLICK TO ENTER",
    coming_soon:      "COMING SOON",

    /* ── Block 0 — SOC Overview ── */
    soc_title_span:   "OVERVIEW",
    soc_sub:          "REAL-TIME GLOBAL CYBER DEFENSE COMMAND CENTER",
    threats_blocked:  "THREATS BLOCKED",
    active_incidents: "ACTIVE INCIDENTS",
    packets_sec:      "PACKETS / SEC",
    ai_confidence:    "AI CONFIDENCE",
    live_stream:      "live stream",
    critical:         "critical",
    inbound:          "inbound",
    attack_map:       "REAL-TIME GLOBAL ATTACK MAP",
    threat_feed:      "LIVE THREAT FEED",
    neural_corr:      "NEURAL CORRELATION",
    threat_radar:     "THREAT RADAR",
    ai_feed:          "AI DECISION FEED",
    cs_full_sub:      "Module under active development — launching soon",

    soc_explain_title:  "WHAT YOU ARE LOOKING AT",
    soc_explain_lead:   "The Security Operations Center Overview is the platform's main command screen — the single place an analyst opens first to understand, at a glance, what the network is currently facing and how the AI engine is responding to it.",
    soc_e1_h: "Threats Blocked",
    soc_e1_b: "A running counter of every malicious flow the detection engine has already classified and the response layer has acted on. It climbs in real time as new flows are processed, giving the analyst an immediate sense of how active the engine is.",
    soc_e2_h: "Active Incidents",
    soc_e2_b: "The number of currently open, unresolved incidents the correlation layer has confirmed as genuine attacks rather than isolated low-confidence signals. This is the number an analyst watches most closely, since it represents real, open work.",
    soc_e3_h: "Packets / Sec",
    soc_e3_b: "A live measure of inbound network throughput. Sudden spikes here often precede a flood or denial-of-service pattern being flagged moments later by the detection models, so this number gives early situational context.",
    soc_e4_h: "AI Confidence",
    soc_e4_b: "The aggregate confidence level the fusion engine currently holds in its own classifications, based on how strongly the underlying models agree with one another. A drop here is a signal to the analyst that recent decisions deserve a closer look.",
    soc_e5_h: "Real-Time Global Attack Map",
    soc_e5_b: "A geographic visualization plotting the origin of inbound malicious traffic as it is detected, giving the analyst an intuitive sense of where pressure on the network is currently coming from.",
    soc_e6_h: "Live Threat Feed",
    soc_e6_b: "A continuously updating, line-by-line stream of individual detected events — source address, detected pattern, and severity — functioning as the platform's raw, unfiltered pulse.",
    soc_e7_h: "Neural Correlation",
    soc_e7_b: "A live graph view of the correlation engine's internal threat graph, showing how individual events are being linked into sessions, attack chains, and campaigns rather than treated as isolated occurrences.",
    soc_e8_h: "Threat Radar",
    soc_e8_b: "A sweeping radar-style visualization plotting currently active threats by proximity and severity, designed to be read peripherally — an analyst can sense rising activity without reading a single number.",
    soc_e9_h: "AI Decision Feed",
    soc_e9_b: "A log of the automated decisions the response engine has actually taken — block, isolate, rate-limit — alongside the model whose finding drove each decision, keeping every automated action transparent and auditable.",

    /* ── Block 1 — AI Pipeline ── */
    pipeline_title:        "AI LEARNING",
    pipeline_sub:           "NETWORK TRAFFIC ATTACK DETECTION — AUTOMATED TRAINING PIPELINE",
    pipeline_intro_lead:    "The AI Pipeline is the background process responsible for producing the very models the detection engine relies on. It runs independently of live traffic processing — searching for data, downloading it, cleaning it, and training on it — then hands a finished model to the live engine without ever requiring it to stop.",
    pl_total_runs:    "TOTAL RUNS",
    pl_total_runs_s:  "pipeline executions",
    pl_datasets:      "DATASETS FOUND",
    pl_datasets_s:    "last run",
    pl_cleaned:       "FILES CLEANED",
    pl_cleaned_s:     "CSV processed",
    pl_training:      "TRAINING",
    pl_training_s:    "last run result",
    pl_stages_h:      "PIPELINE STAGES",
    pl_local_folder:  "Local Folder Dataset",
    pl_local_file:    "Local File Dataset",
    pl_run_once:      "Run Once",
    pl_start_rt:      "Start Real-time",
    pl_config_h:      "PIPELINE CONFIG",
    pl_log_h:         "PIPELINE LOG",
    pl_reload:        "RELOAD",
    pl_quick:         "QUICK CONTROLS",

    pl_s1_title:   "Advisor",
    pl_s1_sub:     "Kaggle search + LLM dataset selection",
    pl_s1_h:       "Stage 1 — Advisor",
    pl_s1_b:       "Searches a public dataset platform directly for real, currently existing network-attack datasets, while a locally hosted language model suggests additional candidates as a secondary source. Every suggested name, regardless of which method produced it, is independently verified to exist before it is ever accepted — preventing the model from ever recommending a dataset that does not actually exist.",

    pl_s2_title:   "Downloader",
    pl_s2_sub:     "Download selected datasets from Kaggle",
    pl_s2_h:       "Stage 2 — Downloader",
    pl_s2_b:       "Retrieves every verified dataset selected in the previous stage, checking file size limits, safely extracting archives with protection against malicious archive paths, and automatically converting recognized alternative formats into the structure the next stage expects.",

    pl_s3_title:   "Cleaner",
    pl_s3_sub:     "Validate and clean CSV files",
    pl_s3_h:       "Stage 3 — Cleaner",
    pl_s3_b:       "Applies a sequence of data-quality passes to every downloaded file: fixing structural issues, inferring each column's true type, filling missing values appropriately for that type, capping extreme outliers without discarding genuine attack signatures, and removing duplicate records — producing a dataset consistently ready for training.",

    pl_s4_title:   "Trainer",
    pl_s4_sub:     "LightGBM + Stacking Ensemble",
    pl_s4_h:       "Stage 4 — Trainer",
    pl_s4_b:       "Trains a LightGBM model on every cleaned dataset, automatically reconciling the different column and label naming conventions used across datasets. When more than one dataset is available, the resulting models are combined through a two-layer stacking ensemble, producing a single, more reliable final model than any individual dataset could produce alone.",

    pl_export_h:    "MODEL EXPORT & VERSIONING",
    pl_export_b:    "The finished model, along with its scaler and feature list, is copied into the exact location the live detection engine watches, under fixed file names the engine already expects.",
    pl_hotreload_h: "HOT RELOAD MECHANISM",
    pl_hotreload_sub:"Zero-downtime",
    pl_hotreload_b: "A small signal file is created the moment export completes. The live engine's background watcher detects this signal and swaps in the new model immediately — with no restart, and with every other model and layer continuing to process live traffic uninterrupted.",

    /* ── Block 2 — AI Copilot ── */
    copilot_title:       "AI SECURITY COPILOT",
    copilot_sub:         "CONVERSATIONAL ANALYST ASSISTANT",
    copilot_intro_lead:  "The AI Copilot is a standalone assistant giving the analyst a natural-language way to ask questions and receive situational summaries, independent of the live detection engine, connected to it only through a single, read-only shared data file.",
    cp_new_chat:        "+ NEW CHAT",
    cp_conversations:   "CONVERSATIONS",
    cp_models:          "MODELS",
    cp_add_model:       "+ Add Model",
    cp_expert_mode:     "EXPERT",
    cp_expert_label:    "Cybersecurity Expert Mode",
    cp_status_label:    "Status confirming current mode",

    cp_e1_h: "Expert Mode Toggle",
    cp_e1_b: "On by default. While active, every message the analyst types is automatically wrapped in an internal prompt instructing the underlying language model to respond as a network and cybersecurity analysis expert, rather than as a general-purpose chatbot.",
    cp_e2_h: "Active Language Model Selector",
    cp_e2_b: "Multiple providers are configurable and switchable per conversation — including several major commercial models alongside any custom, compatible provider the analyst chooses to add.",
    cp_e3_h: "Persistent Conversation History",
    cp_e3_b: "Every conversation is saved to disk the moment it happens, and reloaded automatically the next time the application launches, so no analyst's question or the assistant's answer is ever lost between sessions.",
    cp_e4_h: "Configured Models List",
    cp_e4_b: "Saved persistently across sessions. Both the built-in models and any custom provider the analyst has added appear here, ready to be selected for the next message.",
    cp_e5_h: "Short Displayed History",
    cp_e5_b: "Even when Expert Mode wraps a message into a long internal prompt before sending it to the model, only the analyst's short, original request is ever saved to the visible chat history — keeping the saved record clean and readable.",
    cp_e6_h: "Status Bar",
    cp_e6_b: "Confirms the current operating mode at a glance, so the analyst always knows whether a message will be answered as a general query or as an expert-context-aware analysis.",

    cp_link_h: "READ-ONLY LINK TO THE SOAR ENGINE",
    cp_link_b: "When Expert Mode is active, the Copilot looks for the SOAR engine's own database file and, if it is present, reads the most recent threat contexts, open campaigns, and operational metrics directly from it — strictly read-only — and feeds that real context into the prompt sent to the language model. If the file isn't found, the Copilot tells the model plainly that no live data is available, rather than letting it invent an answer. The two systems never import one another directly; the database file is the only thing connecting them.",
    cp_report_h: "Network Status Report",
    cp_report_b: "A single dedicated action that requests a full summary of the current network situation, built entirely from the same live SOAR context, without the analyst needing to type a question at all.",
  },

  ar: {
    /* ── Carousel labels ── */
    block1_label:     "نظرة SOC",
    block2_label:     "خط الذكاء الاصطناعي",
    block3_label:     "المساعد الأمني الذكي",
    click_enter:      "انقر للدخول",
    coming_soon:      "قريباً",

    /* ── Block 0 — SOC Overview ── */
    soc_title_span:   "نظرة عامة",
    soc_sub:          "مركز الدفاع السيبراني العالمي — مباشر",
    threats_blocked:  "تهديدات محجوبة",
    active_incidents: "حوادث نشطة",
    packets_sec:      "حزمة / ثانية",
    ai_confidence:    "دقة الذكاء",
    live_stream:      "بث مباشر",
    critical:         "حرج",
    inbound:          "وارد",
    attack_map:       "خريطة الهجمات العالمية — مباشر",
    threat_feed:      "تغذية التهديدات المباشرة",
    neural_corr:      "الارتباط العصبي",
    threat_radar:     "رادار التهديدات",
    ai_feed:          "قرارات الذكاء الاصطناعي",
    cs_full_sub:      "الوحدة قيد التطوير — ستُطلق قريباً",

    soc_explain_title:  "ما الذي تراه أمامك",
    soc_explain_lead:   "نظرة SOC العامة هي شاشة القيادة الرئيسية للمنصة — أول مكان يفتحه المحلل ليفهم، بنظرة واحدة، الوضع الحالي للشبكة وكيف يستجيب محرك الذكاء الاصطناعي له.",
    soc_e1_h: "تهديدات محجوبة",
    soc_e1_b: "عداد متزايد لكل تدفق خبيث صنّفه محرك الكشف فعلياً واتخذت طبقة الاستجابة إجراءً بشأنه. يرتفع في الوقت الفعلي مع معالجة تدفقات جديدة، مما يعطي المحلل إحساساً مباشراً بمدى نشاط المحرك.",
    soc_e2_h: "حوادث نشطة",
    soc_e2_b: "عدد الحوادث المفتوحة وغير المحلولة حالياً، التي أكدتها طبقة الربط كهجمات حقيقية وليست إشارات منفردة منخفضة الثقة. هذا هو الرقم الذي يتابعه المحلل بأكبر انتباه، لأنه يمثل عملاً فعلياً مفتوحاً.",
    soc_e3_h: "حزمة / ثانية",
    soc_e3_b: "قياس مباشر لمعدل حركة البيانات الواردة. الارتفاعات المفاجئة هنا غالباً ما تسبق رصد نمط فيضان أو حجب خدمة بعد لحظات من نماذج الكشف، فهذا الرقم يعطي سياقاً مبكراً للوضع.",
    soc_e4_h: "دقة الذكاء الاصطناعي",
    soc_e4_b: "مستوى الثقة الإجمالي الذي يحمله محرك الدمج حالياً في تصنيفاته، بناءً على درجة اتفاق النماذج الأساسية مع بعضها. انخفاض هذا الرقم إشارة للمحلل بأن القرارات الأخيرة تستحق مراجعة أدق.",
    soc_e5_h: "خريطة الهجمات العالمية المباشرة",
    soc_e5_b: "تصور جغرافي يرسم مصدر حركة البيانات الخبيثة الواردة وقت اكتشافها، مما يعطي المحلل حساً بديهياً بمصدر الضغط الحالي على الشبكة.",
    soc_e6_h: "تغذية التهديدات المباشرة",
    soc_e6_b: "تدفق متجدد باستمرار، سطر بسطر، لكل حدث مكتشف على حدة — عنوان المصدر، النمط المكتشف، ودرجة الخطورة — بمثابة النبض الخام غير المُرشَّح للمنصة.",
    soc_e7_h: "الارتباط العصبي",
    soc_e7_b: "عرض مباشر للرسم البياني الداخلي لمحرك الربط، يوضح كيف يتم ربط الأحداث المنفردة في جلسات وسلاسل هجوم وحملات منظمة، بدلاً من معاملتها كأحداث منعزلة.",
    soc_e8_h: "رادار التهديدات",
    soc_e8_b: "تصور دوّار على شكل رادار يرسم التهديدات النشطة حالياً بحسب القرب والخطورة، مصمم ليُقرأ بنظرة عابرة — يستطيع المحلل استشعار ارتفاع النشاط من غير قراءة رقم واحد.",
    soc_e9_h: "قرارات الذكاء الاصطناعي",
    soc_e9_b: "سجل للقرارات الآلية التي اتخذتها طبقة الاستجابة فعلياً — حجب، عزل، تقييد معدل — مرفقاً بالنموذج الذي أدى اكتشافه إلى كل قرار، مما يحافظ على شفافية كل إجراء آلي وقابليته للتدقيق.",

    /* ── Block 1 — AI Pipeline ── */
    pipeline_title:        "تعلّم الذكاء الاصطناعي",
    pipeline_sub:           "كشف هجمات حركة الشبكة — خط أنابيب تدريب آلي",
    pipeline_intro_lead:    "خط أنابيب الذكاء الاصطناعي هو العملية الخلفية المسؤولة عن إنتاج النماذج التي يعتمد عليها محرك الكشف فعلياً. يعمل بشكل مستقل تماماً عن معالجة حركة الشبكة المباشرة — يبحث عن بيانات، يحمّلها، ينظفها، ويتدرب عليها — ثم يسلّم نموذجاً جاهزاً للمحرك المباشر من غير أن يحتاج لإيقافه أبداً.",
    pl_total_runs:    "إجمالي التشغيلات",
    pl_total_runs_s:  "مرات تنفيذ الخط",
    pl_datasets:      "مجموعات البيانات الموجودة",
    pl_datasets_s:    "آخر تشغيل",
    pl_cleaned:       "ملفات تم تنظيفها",
    pl_cleaned_s:     "ملفات CSV معالجة",
    pl_training:      "التدريب",
    pl_training_s:    "نتيجة آخر تشغيل",
    pl_stages_h:      "مراحل خط الأنابيب",
    pl_local_folder:  "مجموعة بيانات من مجلد محلي",
    pl_local_file:    "مجموعة بيانات من ملف محلي",
    pl_run_once:      "تشغيل لمرة واحدة",
    pl_start_rt:      "بدء الوضع اللحظي",
    pl_config_h:      "إعدادات خط الأنابيب",
    pl_log_h:         "سجل خط الأنابيب",
    pl_reload:        "تحديث",
    pl_quick:         "تحكم سريع",

    pl_s1_title:   "Advisor",
    pl_s1_sub:     "بحث Kaggle + اختيار بمساعدة نموذج لغوي",
    pl_s1_h:       "المرحلة 1 — Advisor",
    pl_s1_b:       "تبحث مباشرة في منصة بيانات عامة عن مجموعات بيانات حقيقية وموجودة فعلياً لهجمات الشبكات، بينما يقترح نموذج لغوي محلي مرشحين إضافيين كمصدر ثانٍ. كل اسم مُقترح، بغض النظر عن الطريقة التي أتى منها، يتم التحقق من وجوده الفعلي بشكل مستقل قبل قبوله نهائياً — وهذا يمنع النموذج من ترشيح مجموعة بيانات غير موجودة على الإطلاق.",

    pl_s2_title:   "Downloader",
    pl_s2_sub:     "تحميل مجموعات البيانات المختارة من Kaggle",
    pl_s2_h:       "المرحلة 2 — Downloader",
    pl_s2_b:       "تحمّل كل مجموعة بيانات تم التحقق منها في المرحلة السابقة، مع فحص حدود حجم الملفات، واستخراج الأرشيفات بأمان مع حماية من مسارات أرشيف خبيثة، وتحويل الصيغ البديلة المعروفة تلقائياً إلى البنية التي تتوقعها المرحلة التالية.",

    pl_s3_title:   "Cleaner",
    pl_s3_sub:     "التحقق من ملفات CSV وتنظيفها",
    pl_s3_h:       "المرحلة 3 — Cleaner",
    pl_s3_b:       "تطبّق سلسلة من خطوات ضبط جودة البيانات على كل ملف محمَّل: إصلاح المشاكل البنيوية، استنتاج النوع الحقيقي لكل عمود، تعويض القيم المفقودة بما يناسب نوعها، تحديد القيم المتطرفة من غير حذف ما قد يكون توقيع هجوم حقيقي، وإزالة السجلات المكررة — لتنتج بيانات جاهزة وموحدة للتدريب.",

    pl_s4_title:   "Trainer",
    pl_s4_sub:     "LightGBM + نموذج تجميع متراكب",
    pl_s4_h:       "المرحلة 4 — Trainer",
    pl_s4_b:       "تدرّب نموذج LightGBM على كل مجموعة بيانات منظفة، مع التوفيق التلقائي بين أسماء الأعمدة والتصنيفات المختلفة بين مجموعات البيانات. عند توفر أكثر من مجموعة بيانات، تُدمج النماذج الناتجة عبر تجميع متراكب من طبقتين، لإنتاج نموذج نهائي واحد أكثر دقة من أي مجموعة بيانات منفردة.",

    pl_export_h:    "تصدير النموذج وإدارة الإصدارات",
    pl_export_b:    "يُنسخ النموذج الجاهز، مع أداة توحيد المقياس الخاصة به وقائمة الخصائص، إلى المكان الدقيق الذي يراقبه محرك الكشف المباشر، بأسماء ملفات ثابتة يتوقعها المحرك مسبقاً.",
    pl_hotreload_h: "آلية إعادة التحميل الفوري",
    pl_hotreload_sub:"بدون أي توقف للخدمة",
    pl_hotreload_b: "يُنشأ ملف إشارة صغير لحظة انتهاء التصدير. يكتشف الراصد الخلفي للمحرك المباشر هذه الإشارة ويستبدل النموذج فوراً — من غير أي إعادة تشغيل، مع استمرار كل النماذج والطبقات الأخرى في معالجة حركة الشبكة المباشرة من غير انقطاع.",

    /* ── Block 2 — AI Copilot ── */
    copilot_title:       "المساعد الأمني الذكي",
    copilot_sub:         "مساعد محادثة للمحلل الأمني",
    copilot_intro_lead:  "المساعد الأمني الذكي تطبيق مستقل يعطي المحلل طريقة محادثة طبيعية لطرح الأسئلة والحصول على ملخصات للوضع الحالي، بشكل مستقل تماماً عن محرك الكشف المباشر، ومرتبط به فقط من خلال ملف بيانات مشترك للقراءة فقط.",
    cp_new_chat:        "+ محادثة جديدة",
    cp_conversations:   "المحادثات",
    cp_models:          "الموديلات",
    cp_add_model:       "+ إضافة موديل",
    cp_expert_mode:     "وضع الخبير",
    cp_expert_label:    "وضع خبير الأمن السيبراني",
    cp_status_label:    "شريط حالة يؤكد الوضع الحالي",

    cp_e1_h: "مفتاح وضع الخبير",
    cp_e1_b: "مفعّل تلقائياً. وقت تفعيله، تُغلَّف كل رسالة يكتبها المحلل تلقائياً ببرومبت داخلي يوجّه النموذج اللغوي للرد كخبير تحليل شبكات وأمن سيبراني، بدلاً من كونه روبوت محادثة عام.",
    cp_e2_h: "محدد النموذج اللغوي النشط",
    cp_e2_b: "يدعم عدة مزودين قابلين للضبط والتبديل لكل محادثة على حدة — منهم عدة نماذج تجارية معروفة، بالإضافة لإمكانية إضافة أي مزود مخصص متوافق يختاره المحلل.",
    cp_e3_h: "سجل محادثة دائم",
    cp_e3_b: "تُحفظ كل محادثة على القرص لحظة حدوثها، وتُعاد تحميلها تلقائياً في المرة التالية لتشغيل التطبيق، بحيث لا يُفقد أي سؤال للمحلل أو رد للمساعد بين الجلسات.",
    cp_e4_h: "قائمة الموديلات المضبوطة",
    cp_e4_b: "محفوظة بشكل دائم بين الجلسات. تظهر هنا الموديلات الأساسية المدمجة وأي موديل مخصص أضافه المحلل، جاهزة للاختيار للرسالة التالية.",
    cp_e5_h: "السجل المعروض المختصر",
    cp_e5_b: "حتى عندما يُغلِّف وضع الخبير الرسالة ببرومبت داخلي طويل قبل إرسالها للنموذج، يُحفَظ في سجل المحادثة الظاهر فقط طلب المحلل الأصلي القصير — مما يحافظ على نظافة السجل المحفوظ وسهولة قراءته.",
    cp_e6_h: "شريط الحالة",
    cp_e6_b: "يؤكد الوضع الحالي للتشغيل بنظرة واحدة، بحيث يعرف المحلل دائماً إذا كانت الرسالة التالية ستُجاب كاستفسار عام أو كتحليل خبير واعٍ بالسياق.",

    cp_link_h: "ربط للقراءة فقط بمحرك SOAR",
    cp_link_b: "عند تفعيل وضع الخبير، يبحث المساعد عن ملف قاعدة بيانات محرك SOAR نفسه، ولو وجده، يقرأ منه مباشرة أحدث سياقات التهديد، والحملات المفتوحة، والمقاييس التشغيلية — بشكل قراءة فقط بالكامل — ويغذي هذا السياق الحقيقي في البرومبت المرسل للنموذج اللغوي. ولو لم يجد الملف، يوضّح المساعد للنموذج صراحة أنه لا توجد بيانات مباشرة متاحة، بدلاً من تركه يؤلف إجابة. النظامان لا يستوردان بعضهما مباشرة أبداً؛ ملف قاعدة البيانات هو الشيء الوحيد الذي يربط بينهما.",
    cp_report_h: "تقرير حالة الشبكة",
    cp_report_b: "إجراء واحد مخصص يطلب ملخصاً كاملاً للوضع الحالي للشبكة، مبني بالكامل على نفس سياق SOAR المباشر، من غير أن يحتاج المحلل لكتابة أي سؤال على الإطلاق.",
  }
};

let currentLang = 'en';

function setLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
      el.textContent = TRANSLATIONS[lang][key];
    }
  });

  // Update active button
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById('btn-' + lang);
  if (btn) btn.classList.add('active');
}
