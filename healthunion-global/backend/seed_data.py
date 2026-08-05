"""Seed data for Insights blog, 3 bilingual placeholder articles."""

BLOG_POSTS = [
    {
        "id": "post-sfda-ghad-guide",
        "slug": "navigating-sfda-ghad-portal",
        "category": "Saudi Arabia (SFDA)",
        "image": "https://images.pexels.com/photos/9574395/pexels-photo-9574395.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "featured": True,
        "date": "2026-01-15",
        "reading_time": 8,
        "en": {
            "title": "Navigating the SFDA GHAD Portal: A Comprehensive Guide for Manufacturers",
            "excerpt": "A step-by-step walkthrough of the Saudi Food and Drug Authority's GHAD ecosystem, from Authorized Representative appointment to Medical Device Marketing Authorization.",
            "body": [
                "The Saudi Food and Drug Authority (SFDA) has consolidated its medical device registration workflow into the GHAD portal, the single digital gateway through which foreign manufacturers reach the Kingdom's market. For manufacturers accustomed to FDA or Health Canada pathways, GHAD introduces a distinct sequence of obligations that hinge on a legally appointed Authorized Representative (AR) established inside Saudi Arabia.",
                "Before any product file can be submitted, the manufacturer must appoint a qualified AR who holds an SFDA establishment licence. The AR becomes the legal interface between the manufacturer and the regulator: receiving correspondence, hosting the device registration, and assuming post-market responsibilities such as vigilance reporting and field safety corrective actions.",
                "Once the AR relationship is formalised, the Medical Device Marketing Authorization (MDMA) application is compiled. A complete technical dossier typically includes the declaration of conformity, evidence of an underlying approval (such as a 510(k) clearance, CE certificate, or Health Canada licence), the ISO 13485 certificate, labelling and Instructions for Use, and a risk classification justification aligned to SFDA's rules.",
                "Classification is decisive. SFDA broadly mirrors the global GHTF/IMDRF risk tiers (Class I, IIa, IIb and III) but local interpretation of borderline products can differ. Engaging an experienced AR early prevents costly resubmissions caused by an incorrect risk grade or an incomplete clinical evaluation.",
                "After submission through GHAD, the file enters technical review. Manufacturers should plan for clarification cycles, where the reviewer requests additional evidence within a fixed response window. Timely, well-structured responses are the single biggest lever on approval timelines.",
                "HealthUnion Global provides legal AR hosting in Riyadh and full GHAD lifecycle management (from initial classification strategy through MDMA grant and ongoing post-market compliance) so manufacturers can enter the Saudi market with confidence and speed.",
            ],
        },
        "ar": {
            "title": "التنقل في بوابة غاد التابعة للهيئة العامة للغذاء والدواء: دليل شامل للمصنعين",
            "excerpt": "شرح تفصيلي خطوة بخطوة لمنظومة غاد التابعة للهيئة السعودية للغذاء والدواء، من تعيين الممثل المعتمد إلى الحصول على إذن تسويق الأجهزة الطبية.",
            "body": [
                "وحّدت الهيئة العامة للغذاء والدواء (SFDA) إجراءات تسجيل الأجهزة الطبية ضمن بوابة غاد، وهي البوابة الرقمية الموحدة التي يصل من خلالها المصنعون الأجانب إلى السوق السعودية. وبالنسبة للمصنعين المعتادين على مسارات إدارة الغذاء والدواء الأمريكية أو هيئة الصحة الكندية، تقدم غاد سلسلة مميزة من الالتزامات ترتكز على ممثل معتمد معيّن قانونيًا داخل المملكة.",
                "قبل تقديم أي ملف منتج، يجب على المصنّع تعيين ممثل معتمد مؤهل يمتلك ترخيص منشأة من الهيئة. ويصبح الممثل المعتمد الواجهة القانونية بين المصنّع والجهة التنظيمية: يتلقى المراسلات، ويستضيف تسجيل الجهاز، ويتحمل مسؤوليات ما بعد التسويق مثل الإبلاغ عن اليقظة والإجراءات التصحيحية الميدانية.",
                "بمجرد إضفاء الطابع الرسمي على علاقة الممثل المعتمد، يتم تجميع طلب إذن تسويق الأجهزة الطبية (MDMA). ويتضمن الملف الفني الكامل عادةً إعلان المطابقة، ودليل الموافقة الأساسية (مثل تصريح 510(k) أو شهادة CE أو رخصة هيئة الصحة الكندية)، وشهادة الأيزو 13485، والبطاقات التعريفية وتعليمات الاستخدام، ومبرر تصنيف المخاطر.",
                "التصنيف عامل حاسم. تتبع الهيئة عمومًا مستويات المخاطر العالمية (الفئة الأولى والثانية أ والثانية ب والثالثة) لكن التفسير المحلي للمنتجات الحدية قد يختلف. إن إشراك ممثل معتمد ذي خبرة مبكرًا يمنع إعادة التقديم المكلفة.",
                "بعد التقديم عبر غاد، يدخل الملف في المراجعة الفنية. وينبغي للمصنعين الاستعداد لدورات الاستيضاح التي يطلب فيها المراجع أدلة إضافية ضمن نافذة زمنية محددة. وتُعد الاستجابات السريعة والمنظمة العامل الأكبر في تسريع الموافقة.",
                "توفر هيلث يونيون غلوبال استضافة الممثل المعتمد القانوني في الرياض وإدارة كاملة لدورة حياة غاد (من استراتيجية التصنيف الأولية حتى منح الإذن والامتثال المستمر بعد التسويق) حتى يتمكن المصنعون من دخول السوق السعودية بثقة وسرعة.",
            ],
        },
    },
    {
        "id": "post-510k-vs-ce",
        "slug": "fda-510k-vs-ce-mark",
        "category": "North America",
        "image": "https://images.pexels.com/photos/13891122/pexels-photo-13891122.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "featured": False,
        "date": "2026-01-08",
        "reading_time": 6,
        "en": {
            "title": "FDA 510(k) vs. CE Mark: Bridging the Transatlantic Gap",
            "excerpt": "Understanding the philosophical and procedural differences between U.S. substantial equivalence and European conformity assessment, and how to leverage one for the other.",
            "body": [
                "Manufacturers expanding across the Atlantic frequently assume that an approval in one jurisdiction translates directly to the other. In reality, the FDA 510(k) and the European CE marking rest on fundamentally different regulatory philosophies.",
                "The 510(k) pathway is built on the concept of substantial equivalence: a new device is cleared by demonstrating that it is as safe and effective as a legally marketed predicate device. The emphasis is comparative and centred on a defined intended use and technological characteristics.",
                "The CE marking, by contrast, is a conformity assessment against the essential requirements of the EU Medical Device Regulation (MDR). It requires a comprehensive clinical evaluation, a quality management system audited by a Notified Body for most classes, and ongoing post-market clinical follow-up.",
                "Bridging the two is possible but demands careful mapping. A robust ISO 13485 quality system underpins both routes, and well-structured clinical and technical documentation can often be repurposed. However, evidence accepted for substantial equivalence may not satisfy MDR's clinical evidence thresholds, and vice versa.",
                "HealthUnion Global's North American Strategy Unit specialises in translating documentation between these frameworks, helping manufacturers sequence submissions efficiently and avoid duplicating evidence-generation efforts.",
            ],
        },
        "ar": {
            "title": "إدارة الغذاء والدواء 510(k) مقابل علامة CE: سد الفجوة عبر الأطلسي",
            "excerpt": "فهم الاختلافات الفلسفية والإجرائية بين مفهوم التكافؤ الجوهري الأمريكي وتقييم المطابقة الأوروبي، وكيفية الاستفادة من أحدهما للآخر.",
            "body": [
                "كثيرًا ما يفترض المصنعون الذين يتوسعون عبر الأطلسي أن الموافقة في ولاية قضائية واحدة تنتقل مباشرة إلى الأخرى. في الواقع، يرتكز مسار 510(k) الأمريكي وعلامة CE الأوروبية على فلسفات تنظيمية مختلفة جوهريًا.",
                "يقوم مسار 510(k) على مفهوم التكافؤ الجوهري: يتم تصريح الجهاز الجديد من خلال إثبات أنه آمن وفعال مثل جهاز مرجعي مسوّق قانونيًا. ويتركز التركيز على الاستخدام المقصود المحدد والخصائص التقنية.",
                "في المقابل، علامة CE هي تقييم مطابقة مقابل المتطلبات الأساسية للائحة الأجهزة الطبية الأوروبية (MDR). وتتطلب تقييمًا سريريًا شاملًا، ونظام إدارة جودة تدققه جهة مُبلّغة لمعظم الفئات، ومتابعة سريرية مستمرة بعد التسويق.",
                "إن سد الفجوة بين الاثنين ممكن لكنه يتطلب رسمًا دقيقًا. يدعم نظام جودة الأيزو 13485 القوي كلا المسارين، ويمكن غالبًا إعادة استخدام الوثائق السريرية والتقنية المنظمة. ومع ذلك، قد لا تفي الأدلة المقبولة للتكافؤ الجوهري بعتبات الأدلة السريرية للائحة MDR والعكس صحيح.",
                "تتخصص وحدة الاستراتيجية لأمريكا الشمالية في هيلث يونيون غلوبال في ترجمة الوثائق بين هذه الأطر، مما يساعد المصنعين على ترتيب التقديمات بكفاءة وتجنب ازدواجية جهود توليد الأدلة.",
            ],
        },
    },
    {
        "id": "post-gcc-cosmetics-2026",
        "slug": "gcc-cosmetics-compliance-2026",
        "category": "Cosmetics",
        "image": "https://images.pexels.com/photos/36339062/pexels-photo-36339062.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "featured": False,
        "date": "2026-01-02",
        "reading_time": 5,
        "en": {
            "title": "GCC Cosmetics Compliance Standards for 2026",
            "excerpt": "What cosmetics brands need to know about notification, labelling and ingredient restrictions across the Gulf Cooperation Council markets in the year ahead.",
            "body": [
                "The Gulf Cooperation Council continues to harmonise its cosmetics regulations under the GSO technical framework, but national implementation still varies in meaningful ways for 2026. Brands entering Saudi Arabia, the UAE, Qatar, Kuwait, Bahrain and Oman must plan for both shared and country-specific requirements.",
                "Product notification remains the cornerstone of market access. In Saudi Arabia, cosmetics are notified through the SFDA's electronic system, with the manufacturer or its authorised representative responsible for maintaining a complete product information file.",
                "Ingredient compliance is tightening. The GSO restricted and prohibited substances lists are periodically updated, and formulations approved in prior years should be re-screened against the current annexes before relabelling for 2026.",
                "Labelling must be bilingual where required, with Arabic mandatory for consumer-facing claims in several markets. Claims substantiation, batch traceability and shelf-life declarations are increasingly scrutinised during border inspections.",
                "For markets outside Saudi Arabia, HealthUnion Global provides technical submission services (dossier compilation and local portal management) while AR hosting and physical logistics are offered directly only for the Saudi market.",
            ],
        },
        "ar": {
            "title": "معايير الامتثال لمستحضرات التجميل في دول الخليج لعام 2026",
            "excerpt": "ما تحتاج علامات مستحضرات التجميل إلى معرفته حول الإشعار والبطاقات التعريفية وقيود المكونات عبر أسواق مجلس التعاون الخليجي في العام المقبل.",
            "body": [
                "يواصل مجلس التعاون الخليجي مواءمة لوائح مستحضرات التجميل ضمن الإطار الفني لهيئة التقييس الخليجية، لكن التطبيق الوطني لا يزال يتفاوت بشكل ملموس لعام 2026. ويجب على العلامات التجارية التي تدخل السعودية والإمارات وقطر والكويت والبحرين وعُمان التخطيط للمتطلبات المشتركة والخاصة بكل دولة.",
                "يظل إشعار المنتج حجر الزاوية للوصول إلى السوق. في السعودية، يتم الإشعار عن مستحضرات التجميل عبر النظام الإلكتروني للهيئة، مع تحمّل المصنّع أو ممثله المعتمد مسؤولية الاحتفاظ بملف معلومات منتج كامل.",
                "يزداد الامتثال للمكونات صرامة. يتم تحديث قوائم المواد المقيدة والمحظورة الخليجية بشكل دوري، وينبغي إعادة فحص التركيبات المعتمدة في السنوات السابقة مقابل الملاحق الحالية قبل إعادة وضع البطاقات لعام 2026.",
                "يجب أن تكون البطاقات التعريفية ثنائية اللغة عند الاقتضاء، مع إلزامية اللغة العربية للادعاءات الموجهة للمستهلك في عدة أسواق. ويخضع إثبات الادعاءات وتتبع الدفعات وإعلانات مدة الصلاحية لتدقيق متزايد أثناء عمليات التفتيش الحدودية.",
                "بالنسبة للأسواق خارج السعودية، توفر هيلث يونيون غلوبال خدمات التقديم الفني (تجميع الملفات وإدارة البوابات المحلية) بينما تُقدَّم استضافة الممثل المعتمد والخدمات اللوجستية الفعلية مباشرةً للسوق السعودية فقط.",
            ],
        },
    },
]
