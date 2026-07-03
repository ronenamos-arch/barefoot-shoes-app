import React from "react";
import { ShieldCheck, FileText, Truck, ArrowRight, CheckCircle2 } from "lucide-react";

interface LegalPageProps {
  onBack: () => void;
}

export function TermsOfUse({ onBack }: LegalPageProps) {
  return (
    <div className="bg-[#05100a] text-white p-6 md:p-10 rounded-3xl border border-[#113221] shadow-[0_12px_45px_rgba(0,0,0,0.6)] space-y-8 text-right max-w-4xl mx-auto animate-fade-in" dir="rtl">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#113221] pb-6">
        <div className="flex items-center gap-3.5">
          <div className="bg-[#bca374]/15 w-12 h-12 rounded-2xl flex items-center justify-center text-[#bca374] border border-[#bca374]/20">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif text-2xl md:text-3xl font-light text-[#bca374]">תנאי שימוש והסכם רכישה</h1>
            <p className="text-xs text-slate-400 mt-1">עודכן לאחרונה: יוני 2026</p>
          </div>
        </div>
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-[#102d1f] hover:bg-[#1a4a33] text-slate-250 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300"
        >
          <span>חזרה לחנות</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#bca374] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#bca374]"></span>
            1. כללי ותנאי השימוש באתר
          </h2>
          <p>
            ברוכים הבאים לאתר barefoot ישראל (להלן: "האתר"). האתר מופעל על ידי נציגות barefoot הרשמית ומציע פלטפורמה לרכישת נעלי יחפנים אנטומיות ורחבות באיכות פרימיום. השימוש באתר, לרבות גלישה בו ו/או רכישת מוצרים, מהווה את הסכמתך המלאה לתנאים המפורטים במסמך זה. אנא קראי אותם בעיון.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#bca374] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#bca374]"></span>
            2. מדיניות הזמנות ורכישה
          </h2>
          <p>
            רכישת מוצרים באתר תתבצע באמצעות מילוי פרטי ההזמנה באופן מלא ותקין. באחריות הרוכש להזין פרטים מדויקים (שם מלא, כתובת מדויקת למשלוח, טלפון ליצירת קשר וכתובת דואר אלקטרוני).
            התשלום מבוצע באופן מאובטח באמצעות מערכת פייפאל (PayPal) או כרטיסי אשראי התואמים את דרישות האתר.
          </p>
          <p>
            ההזמנה תאושר ותיכנס לעיבוד רק לאחר קבלת אישור סופי מחברת הסליקה או פייפאל. האתר שומר לעצמו את הזכות לבטל הזמנה בכל מקרה של חשש להונאה או הזנת פרטים חסרים שאינם מאפשרים את השלמת המשלוח.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#bca374] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#bca374]"></span>
            3. הגבלת אחריות ושימוש נאות
          </h2>
          <p>
            חנות barefoot ישראל פועלת כדי לספק את המוצרים האנטומיים האיכותיים ביותר. עם זאת, אין לראות במידע הרפואי והאנטומי המוצג באתר (לרבות המדריך הרפואי) משום ייעוץ רפואי רשמי או תחליף לאבחון אצל רופא מומחה או אורתופד. השימוש בנעלי יחפנים ובמוצרים המוצעים הוא על אחריות הלקוח, תוך התחשבות במצב הבריאותי האישי וקצב ההסתגלות המומלץ למעבר לנעליים שטוחות.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#bca374] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#bca374]"></span>
            4. החזרות, ביטולים והחלפות מידה
          </h2>
          <p>
            אנו מחויבים לשביעות הרצון המלאה שלך! ניתן לבטל עסקה ולהחזיר מוצר תוך 14 ימים ממועד קבלתו, ובלבד שהמוצר נשמר באריזתו המקורית, לא נעשה בו כל שימוש והוא במצב חדש לחלוטין ללא לכלוך או שפשופים.
          </p>
          <p>
            במקרה של החלפת מידה, אנו מציעים תמיכה מהירה ושירות מותאם כדי להבטיח התאמה אנטומית מושלמת לכף הרגל שלך. פני לשירות הלקוחות שלנו לקבלת הנחיות מפורטות לביצוע החלפה.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#bca374] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#bca374]"></span>
            5. קניין רוחני וזכויות יוצרים
          </h2>
          <p>
            כל התכנים, העיצובים, התמונות, המדריכים והסימנים המסחריים המוצגים באתר שייכים באופן בלעדי למותג barefoot. אין להעתיק, לשכפל, להפיץ או לעשות כל שימוש מסחרי בחומרים ללא קבלת אישור בכתב ומראש מהנהלת החנות.
          </p>
        </section>
      </div>

      {/* Footer Accent */}
      <div className="bg-[#091b12] p-4 rounded-2xl border border-[#1b3d2d] flex items-center gap-3">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        <span className="text-xs text-slate-350">
          כל רכישה באתר מוגנת תחת תוכנית הגנת הצרכן המלאה ומאובטחת ברמת ההצפנה הגבוהה ביותר (SSL).
        </span>
      </div>
    </div>
  );
}

export function PrivacyPolicy({ onBack }: LegalPageProps) {
  return (
    <div className="bg-[#05100a] text-white p-6 md:p-10 rounded-3xl border border-[#113221] shadow-[0_12px_45px_rgba(0,0,0,0.6)] space-y-8 text-right max-w-4xl mx-auto animate-fade-in" dir="rtl">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#113221] pb-6">
        <div className="flex items-center gap-3.5">
          <div className="bg-[#bca374]/15 w-12 h-12 rounded-2xl flex items-center justify-center text-[#bca374] border border-[#bca374]/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif text-2xl md:text-3xl font-light text-[#bca374]">מדיניות פרטיות והגנת מידע</h1>
            <p className="text-xs text-slate-400 mt-1">עודכן לאחרונה: יוני 2026</p>
          </div>
        </div>
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-[#102d1f] hover:bg-[#1a4a33] text-slate-250 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300"
        >
          <span>חזרה לחנות</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#bca374] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#bca374]"></span>
            1. המידע שאנו אוספים
          </h2>
          <p>
            אנו מעריכים ומכבדים את הפרטיות שלך. בעת ביצוע רכישה או פנייה לשירות הלקוחות באתר, אנו אוספים את פרטי הקשר הנחוצים בלבד לצורך עיבוד וביצוע ההזמנה ושילוחה המהיר אליך:
          </p>
          <ul className="list-disc list-inside space-y-1 pr-4 text-slate-350 text-xs">
            <li>שם מלא</li>
            <li>כתובת למשלוח ומיקוד</li>
            <li>מספר טלפון נייד (לתיאום השליח)</li>
            <li>כתובת דואר אלקטרוני (לאישור הזמנה ומעקב משלוח)</li>
            <li>פרטי עגלת הקניות והמידה שנבחרה</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#bca374] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#bca374]"></span>
            2. כיצד אנו משתמשים במידע
          </h2>
          <p>
            הפרטים הנמסרים על ידך משמשים אך ורק לצורך מתן השירות המבוקש. אנו משתמשים בפרטי הכתובת והטלפון שלך כדי ליצור את תווית המשלוח ולתאם את מסירת החבילה על ידי חברת השליחויות. כתובת האימייל משמשת למשלוח עדכונים אוטומטיים על סטטוס ההזמנה ומספר המעקב לחבילה.
          </p>
          <p>
            חל איסור מוחלט על העברה, מכירה או השכרה של פרטיך האישיים לצדדים שלישיים כלשהם למטרות שיווק או פרסום ללא הסכמתך המפורשת.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#bca374] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#bca374]"></span>
            3. אבטחת מידע וסליקה מאובטחת
          </h2>
          <p>
            האתר עושה שימוש בטכנולוגיות אבטחה מתקדמות (הצפנת SSL) כדי להגן על פרטי הלקוחות. תהליך התשלום והסליקה מבוצע ישירות על גבי השרתים המאובטחים של חברת פייפאל (PayPal) ואינו נשמר או נשמר במערכות האתר שלנו, דבר המבטיח רמת הגנה מקסימלית לפרטי האשראי והחשבון שלך.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#bca374] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#bca374]"></span>
            4. זכויות הלקוח
          </h2>
          <p>
            בהתאם לחוק הגנת הפרטיות, לכל לקוח שמורה הזכות לפנות אלינו בכל עת ולבקש לעיין במידע שנשמר אודותיו, לעדכן אותו, לתקן שגיאות או לבקש את מחיקתו המלאה ממערכות הנתונים שלנו. לביצוע פעולות אלו, ניתן לפנות לשירות הלקוחות בטלפון או בדואר אלקטרוני.
          </p>
        </section>
      </div>

      {/* Footer Accent */}
      <div className="bg-[#091b12] p-4 rounded-2xl border border-[#1b3d2d] flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
        <span className="text-xs text-slate-350">
          אנו שומרים על פרטיותך בדיוק כפי שהיינו רוצים שישמרו על שלנו. הפרטיות והביטחון שלך נמצאים בראש סדר העדיפויות שלנו.
        </span>
      </div>
    </div>
  );
}

export function ShippingPolicy({ onBack }: LegalPageProps) {
  return (
    <div className="bg-[#05100a] text-white p-6 md:p-10 rounded-3xl border border-[#113221] shadow-[0_12px_45px_rgba(0,0,0,0.6)] space-y-8 text-right max-w-4xl mx-auto animate-fade-in" dir="rtl">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#113221] pb-6">
        <div className="flex items-center gap-3.5">
          <div className="bg-[#bca374]/15 w-12 h-12 rounded-2xl flex items-center justify-center text-[#bca374] border border-[#bca374]/20">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif text-2xl md:text-3xl font-light text-[#bca374]">מדיניות משלוחים ואספקה</h1>
            <p className="text-xs text-slate-400 mt-1">עודכן לאחרונה: יוני 2026</p>
          </div>
        </div>
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-[#102d1f] hover:bg-[#1a4a33] text-slate-250 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300"
        >
          <span>חזרה לחנות</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#bca374] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#bca374]"></span>
            1. זמני אספקה ומשלוח חינם
          </h2>
          <p>
            אנו מציעים <strong>משלוח מהיר חינם לכל חלקי הארץ</strong> עבור כל ההזמנות באתר!
            זמני האספקה המשוערים לחבילות הם בדרך כלל בין <strong>7 ל-14 ימי עסקים</strong> (למעט ימי שישי, שבת, ערבי חג וימי חג רשמיים).
            אנו עושים את מרב המאמצים כדי לעבד, לארוז ולשלוח את ההזמנות במהירות המרבית מרגע קבלת אישור התשלום.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#bca374] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#bca374]"></span>
            2. מעקב אחר משלוחים
          </h2>
          <p>
            בתוך 2-4 ימי עסקים מביצוע ההזמנה, יישלח אליך דואר אלקטרוני ו/או הודעת SMS המכילה את <strong>מספר המעקב האישי</strong> של החבילה שלך יחד עם קישור ישיר למערכת המעקב הרשמית. כך תוכלי לדעת בדיוק היכן החבילה נמצאת בכל שלב ומהו מועד המסירה המשוער.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#bca374] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#bca374]"></span>
            3. תהליך מסירת החבילה
          </h2>
          <p>
            המשלוחים מבוצעים ישירות לכתובת המגורים או העסק שהוזנה במהלך ההזמנה. חברת השליחויות המקומית תתאם איתך מראש את מועד המסירה באמצעות שיחת טלפון או הודעת SMS לפני הגעת השליח. באחריות הלקוח להיות זמין לתיאום זה כדי למנוע עיכובים במסירה.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#bca374] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#bca374]"></span>
            4. החזרות והחלפות - משלוח חוזר
          </h2>
          <p>
            אם מסיבה כלשהי ברצונך להחליף מידה או להחזיר את הנעליים, שירות הלקוחות שלנו יעזור לך לסדר זאת במהירות וביעילות. תהליך ההחלפה נוח במיוחד ומבוצע בליווי אישי של הצוות שלנו. לפרטים נוספים ותיאום החזרה, פני אלינו בעמוד יצירת הקשר או בווטסאפ.
          </p>
        </section>
      </div>

      {/* Footer Accent */}
      <div className="bg-[#091b12] p-4 rounded-2xl border border-[#1b3d2d] flex items-center gap-3">
        <Truck className="w-5 h-5 text-emerald-400 shrink-0" />
        <span className="text-xs text-slate-350">
          אנו שולחים את המוצרים באריזה קשיחה ומרופדת השומרת על שלמות המוצר והקופסה האנטומית עד להגעתה לידיך.
        </span>
      </div>
    </div>
  );
}
