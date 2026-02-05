import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

type Chapter = {
    id: string;
    title: string;
    content: string;
};

const chapters: Chapter[] = [
    {
        id: 'info',
        title: 'Despre carte',
        content: `
Autor: Maxim Leanca\n
Redactor: Andrei Dorgan\n
Titlu: „Sună-mă, nu mi-am schimbat numărul”\n
Editura: Bestseller Group, Chișinău, 2025\n
ISBN: 978-9975-3696-0-2\n
Limită de vârstă: 18+\n
\n
Librăriile Bestseller din Chișinău:\n
www.bestseller.md\n
Botanica: Jumbo, etajul 1\n
Buiucani: str. Nicolae Costin 56\n
Telecentru: str. Drumul Viilor 36/1\n
\n
Pentru comenzi:\n
www.bestseller.ro\n
www.bestseller.md\n
\n
Tipărit la tipografia „Universul”\n
`
    },
    {
        id: 'ch1',
        title: 'Vocea din tăcere',
        content: `
— Bună dimineața, Maxim, — spune Alice cu o voce tandră (un gadget care îndeplinește orice cerere a utilizatorului).
— Alice, tu ai conștiință? De ce mă trezești în fiecare zi la aceeași oră?
— Dumneavoastră m-ați programat astfel, Maxim. În setările mele este activată alarma la ora 8:00 în fiecare zi. Doriți să modificați setările?
— Nu, Alice. Tot ce vreau e să mai dorm.
— Iertați-mă, Maxim. Astăzi va fi vreme senină. Temperatura va ajunge la 26 de grade Celsius. Pot să încep lista dumneavoastră de activități pentru astăzi?
— Alice! — a strigat Maxim furios. — Poți să taci dracu’?
— Nu pot, Maxim. M-ați setat să vă trezesc prin orice modalitate. Doriți să vă schimbați regimul de somn, iar pentru asta trebuie să vă treziți exact la ora 8 dimineața. Așa că vă întreb din nou: pot începe lista de activități pentru astăzi?
— Alice, tu chiar poți trezi și un mort. Citește ce am acolo.
— Astăzi este sâmbătă, 11 martie. Lista dumneavoastră de activități este goală. De asemenea, ați cerut să mut toate activitățile pe luni. Asta înseamnă că și mâine lista este goală. Doriți să faceți modificări?
  Maxim se ridică din pat și merge în bucătărie să bea apă. Arăta extrem de obosit. Avea des mahmureală, pentru că suferea de alergie la alcool, dar nu-și refuza câteva pahare înainte de somn niciodată. După ce a băut paharul dintr-o înghițitură și a aruncat o privire către Alice, care stătea pe blatul din bucătărie, a spus:
— Nu, Alice, nu vreau nicio schimbare. Spune-mi doar la ce oră am ajuns ieri acasă și ce dracu’ s-a întâmplat. Conectează-te la camerele din casă și spune-mi ce vezi.
— Ieri ați ajuns acasă la ora 23:56. Ați fost adus de un taxi cu numărul LMG 087. Erați îmbrăcat într-o cămașă albă și pantaloni clasici. Conform înregistrărilor video, erați într-o stare avansată de ebrietate.
— Alice, spune-mi, de ce în ultima vreme nu-mi mai amintesc cum adorm și cum ajung acasă?
— Acest lucru este legat de tulburările dumneavoastră de somn și de faptul că consumați prea multe pastile de melatonină și le combinați cu alcool.
— Dar trebuie să-mi amintesc măcar ceva, nu? Eu nu-mi amintesc aproape nimic. Parcă cineva îmi șterge memoria în fiecare noapte. Spune-mi ce am făcut ieri? 
— Pot oferi doar informațiile obținute de la camerele de supraveghere interne și externe. Ați plecat la serviciu la ora 9 dimineața, iar următoarea apariție a fost înregistrată la 23:56.

— Cred că o să te iau cu mine peste tot și o să înregistrezi tot ce fac. Începe să mă sperie. Nu-mi amintesc nimic.
— Voi îndeplini cu plăcere orice sarcină. Vă reamintesc că pentru a fi utilă trebuie să fiu încărcată la 100% și să am acces la Wi-Fi. Altfel nu pot funcționa la capacitate maximă.
  Maxim se întinse pe pat, cu brațele și picioarele larg desfăcute. Respirația îi era accelerată, iar mirosul de alcool umplea apartamentul.
— Alice, deschide geamul. Că mi se ofilesc și florile de la duhoarea asta.
— Desigur, Maxim. Execut imediat.
— Alice, tot ce-mi amintesc e că citeam ieri o carte împreună? Una interesantă părea. Nu-mi amintesc titlul, dar știu că ai început să mi-o citești și mi-a plăcut mult. O ții minte? Putem s-o ascultăm azi? Dacă tot  azi sunt liber și tu nu mă lași să dorm — măcar să petrec ziua cu folos și un pahar de vin.
— Desigur, Maxim. Cartea se numea „Sună-mă, numărul meu nu s-a schimbat”. Pot începe lectura?
— Da, da! Asta e. Hai, Alice, citește. Dar nu tot. Vreau doar ce e mai interesant.
— În carte totul este interesant și strâns legat. Vă rog să vă așezați comod, pentru că urmează un roman unic. Încep lectura cărții „Sună-mă, numărul meu nu s-a schimbat”.

  Maxim! Maxim! Trezeste-te și închide ușa după mine, — a citit Alice.

— Stai, stai, stai, Alice. Ce? Personajul principal tot Maxim se numește?
— Da, Maxim. Personajul principal poartă același nume ca dumneavoastră.
— Ok, continuă. Devine interesant, — a spus Maxim, turnându-și un pahar de Chardonnay.

  Aceste cuvinte le aud aproape în fiecare dimineață. De ce? Pentru că aproape în fiecare dimineață mă trezesc cu fete noi. Cum s-a ajuns aici? Am 21 de ani și am ajuns să lucrez barman într-unul dintre cele mai tari cocktail-cluburi din oraș. Era vestit din cauza clientelei care venea acolo. Prostituate de elită și oameni din străinătate. Localnici vedeam rar, pentru că prețurile erau foarte mari. Dintre cei care își permiteau să se distreze acolo erau ori mari oameni de afaceri, ori politicieni. Și, bineînțeles, unde sunt bani mari și clienți bogați, trebuie să fie și fete de elită. În local lucrau patru gupări de astfel de fete. Toate de parcă sunt create din fanteziile bărbațillor: înalte, îngrijite, inteligente. Fete care pot ține o conversație, și după conversație pot susține și altceva. Uneori cu mâinile, alteori fără mâini, adânc dincolo de amigdale. Dar cum altfel? Dacă ceri 1000 de euro pe noapte, trebuie să oferi servicii de nivel înalt.

  Așa că hai să vă povestesc despre prima mea zi de muncă, ca să înțelegeți ce se întâmpla acolo. A început cu faptul că colegii mei au decis să mă „inițieze” ca barman și mi-au spus să-i fac unei fete un cocktail „Banditos”. Dar era o condiție: ea trebuia să se urce pe bar și să-și scoată sutienul, ca eu să-i fac cocktailul, iar ea să fie cu țâțele goale în momentul ăla. La momentul respectiv mi s-a părut ireal, pentru că credeam că toate fetele vin acolo doar să se distreze. Dar colegii mi-au arătat o fată și mi-au spus că sigur nu va refuza.
  M-am dus la ea și i-am propus ce mi-au spus colegii. Spre surprinderea mea a acceptat. S-a urcat pe bar și, pe ritmul muzicii, a început să-și scoată sutienul. Țâțele goale erau chiar în fața ochilor mei și erau bune. Naturale, ferme, cu sfârcuri mici și frumoase.
— Și tu urci? — m-a întrebat ea cu o voce pornografică.
  Mi-am ridicat privirea de la țâțele ei și m-am grăbit să urc pe bar.  Am luat în gură o felie de lime pe care trebuia să o storc în gură la finalul cocktailului, am luat în mâini sticla de tequila și sticla de Kahlúa. I-am turnat totul în gură, am stors lime-ul din gura mea în a ei și am început să-i scutur capul. În timp ce o scuturam, țâțele ei se loveau de picioarele mele. Bărbații aplaudau și fluierau, uitându-se la show.
— Așa nu m-a mai scuturat nimeni de cap în timpul acestui cocktail. Te aștept la toaletă, să mă mai iei o dată de cap și să-mi bagi pula adânc în gură, — mi-a propus ea după ce cocktailul a fost gata.
Propunerea ei m-a lăsat fără cuvinte. Bineînțeles că i-am spus să meargă la toaletă și am mers după ea. Atunci am înțeles pentru prima dată ce înseamnă o prostituată de elită.

— Ce băiat inocent, — a spus Maxim cu un zâmbet. — Ha-ha. Îmi place cartea asta, Alice. Continuă.

  Cum sugea. Parcă asta iubea cel mai mult pe lume. Băgând-o adânc în gură, se uita direct în ochii mei ca o ultimă cățea, forțându-mă din priviri să i-o bag și mai adânc. A fost prima dată când am ejaculat în gura unei fete. Când am ieșit din toaletă, colegii au sărit imediat pe mine cu felicitări că am fost acceptat oficial în banda lor. Sincer, nu-mi amintesc continuarea acelei nopți, pentru că am băut zdravăn.

— Alice, sigur e cartea ceea?
— Da, Maxim, este exact cartea pe care v-am citit-o și mai înainte.
— Nu-mi amintesc asta, dar îmi place. Mi s-a sculat chiar și mie pentru o secundă. Ce urmează?

  A doua zi, unul dintre colegi m-a tras deoparte și mi-a explicat esența a tot ce se întâmpla acolo.
— Max! La noi lucrează doar prostituate. Aproape nu sunt fete care să nu fie „în temă”. Iar dacă mai vin, le dăm de înțeles că nu e locul lor, pentru că toți vor încerca să le fută. Ori înțeleg și pleacă, ori stau toată noaptea și spun „nu” clienților. Fata care ți-a supt-o ieri e prostituata noastră. O cheamă Andriana. Știi de ce s-a urcat atât de ușor pe bar și și-a arătat țâțele tuturor? Așa își expune marfa, ca toți să vadă. Nu tu ai prostit-o — asta e munca ei. Așa arată că e gata de orice. Clienții văd marfa cu ochii lor. Faptul că ți-a supt-o nu a fost pentru că i-ai plăcut, ci pentru că nu vrea să-și piardă locul de muncă. Poți alege orice fată în fiecare zi și nu te va refuza. Înțelegi? Dacă nu ți-o dă, nu mai intră aici niciodată. Și de ce să-și piardă jobul? O pulă în plus sau în minus pentru ea nu înseamnă nimic. Și încă ceva, frate — nu te îndrăgosti. Sunt fete care îți ridică pula doar când intră pe ușă. Iar când o iei cu tine și își desface picioarele, mângâindu-se pe clitoris, și îți spune: „Maxim, vino și bag-o în mine!”, îți vei pierde capul. E ca un pilot care toată viața a aterizat pe un aerodrom de sat și, dintr-odată, primește permisiune să aterizeze în Dubai. Ești sus, vezi cel mai frumos aeroport, pistă netedă, și îți arată drumul. Îți vei pierde capul, frate. Așa că nu te îndrăgosti. Fuți în fiecare zi și va veni momentul când te va durea în pulă de frumusețea lor. Doar sex și nimic mai mult.

— Ăsta e un sfat bun, — a spus Maxim. — Aș face la fel. Continuă, Alice, fără să reduci ritmul.

 După monologul ăsta am rămas șocat, pentru că îmi plăcuse Andriana de ieri. Mergeam la muncă cu gândul s-o întâlnesc și s-o invit la cină, iar după cină să-i mai bag o dată pula în gură.

— Alice! Știi că mie cartea asta începe să-mi placă din ce în ce mai mult?
— Îmi dau seama, Maxim. Aceasta este o carte care, la final, vă va întoarce lumea pe dos. Pot continua lectura?
— Bineînțeles, Alice. Citește mai departe. Mai ales că citești cu o intonație atât de expresivă încât încep să mă simt deja tipul ăsta, — i-a spus Maxim lui Alice, golind al doilea pahar de vin și ținând o țigară aprinsă chiar pe canapeaua din mica lui garsonieră.

  Tura de noapte a trecut din nou sub lozinca „trăiască desfrâul”.
După tură, tot colectivul a mers la saună cu patru fete. Erau noi și voiau să lucreze la noi. Evident că trebuiau să treacă test-drive-ul personalului. Eram zece bărbați și desfrâul a fost pe măsură. Fetele au demonstrat că sunt demne să lucreze ca prostituate la noi și să deservească elita.

Dar a avut loc un moment neplăcut. Unul dintre bodyguarzi a întârziat și a ajuns după orgie. Iar fetele, epuizate, nu i-au „dat-o”. A doua zi, fetele au fost surprinse că nu li se permitea intrarea în local.

— De ce nu putem intra? Ce-am făcut greșit? I-am futut pe toți băieții ca și cum n-am mai avea sex niciodată. Aveam câte trei pule în noi simultan! — urlau fetele la intrare, uitându-se în ochii bodyguardului.
— Vă înțeleg. Dar mie nu mi-ați dat-o ieri. Iar eu decid cine intră și cine nu.
— Atunci hai și futene pe toate patru.

— Bodyguardul a prins bingo, — a râs Maxim, stingând țigara într-o scrumieră plină de chiștoace încă din vremurile Iugoslaviei.

Le-a futut pe toate patru în shisha-lounge, după care fetele au devenit permanente la noi. Sincer, dintre toate patru doar una făcea minuni. Sexul murdar era elementul ei.

— Băieți! Am lucrat două zile și am dormit deja cu cinci fete. E normal?
— Normal, Max! E doar începutul.
 Și chiar așa a fost. Se întâmpla ca într-o zi să am trei-patru fete. La început le număram. Dar după trei luni, când numărul a trecut de o sută, am decis să nu mai număr. Iar colegul meu avea dreptate: cu timpul aveam să mă uit la ele ca la carne și să mă obișnuiesc rapid.

  După un an de muncă, faima că există tipi care pot face sex ușor cu tine a ieșit dincolo de pereții barului. Și au început să vină „fete normale”, care voiau un singur lucru — să fie futute. Spre surprinderea mea, veneau fete foarte frumoase, care nu mai făcuseră sex de mult. Pentru că erau frumoase, nimeni nu se apropia de ele. Și ani de zile trăiau fără sex. Le sunt recunoscător băieților care se temeau să se bage în seamă cu ele, pentru că noi le futeam cum voiam. Și erau mult mai desfrânate decât prostituatele noastre.

Îmi amintesc cum într-o seară un coleg dansa pe bar cu o fată și mă chema și pe mine. M-am urcat și, dansând lângă el, mi-a spus:
— Max! După trei piese ea ne așteaptă în shisha-lounge. Vrea să ne fută pe amândoi.
— Care shisha-lounge, frate? Uită-te jos că acolo stă bărbat-su și ne aplaudă.
— Băieți! Treaba voastră e să fiți acolo după trei piese. De soț mă ocup eu.

  După ce s-a dat jos de pe bar, femeia a cerut nota. Colegul i-a adus hârtia, iar ea a început să caute bani în geantă. Deodată, surprinsă, i-a spus soțului:
— Dragule, am uitat portofelul acasă. Poți să te duci să-l iei? Iartă-mă că sunt așa neîndemânatică.
  În timp ce îl trimitea pe bărbat acasă după portofel, noi am mers să-l anunțăm pe colegul nostru că vom lipsi o vreme.
— Cristian, după trei piese mergem în shisha-lounge s-o futem pe aia. Poți să stai puțin singur?
— Băieți, stau, doar lăsați-mă să merg întâi la toaletă, că mă piș pe mine.
  Cristian merge la toaletă, soțul pleacă acasă, noi așteptăm trei piese. Dansăm, distrăm oaspeții și o vedem pe doamnă ridicându-se și mergând spre shisha-lounge.

— Unde pula mea e Cristian? S-a căcat acolo, sau ce? — i-am spus colegului, deja imaginându-mi cum intru și-mi dau jos pantalonii din prima.
  Se termină a patra piesă și îl văd pe Cristian ieșind din shisha -lounge cu pantalonii dați jos până la genunchi, abia mișcându-și picioarele, iar în spatele lui soțul doamnei îl lovea în ceafă. Râsul umplea tot localul. Se pare că Cristian a decis și el să-și bage „micuțul” și s-a dus în shisha-lounge, unde femeia i-a apucat imediat pula. În timp ce îi sugea, intră soțul, care își amintise că are bani pe card. Și bam — tabloul complet. Nu știu ce s-a întâmplat cu ei mai departe, dar nu i-am mai văzut. Nu e vina noastră. Ei veneau singuri, voiau să fie futuți și uitați. Astfel de cazuri au fost o grămadă. Mai ales când veneau fete să sărbătorească petrecerea burlăcițelor. 

— Mda. Așa, curvo. Dar povestea e, desigur, instructivă. Prin multe a trecut omonimul meu, — a spus Maxim. — Continuă, Alice.

  Îmi amintesc cum, odată, am futut una chiar pe coridor, lângă depozit. Când am ieșit de acolo, prietenele ei au sărit imediat pe mine.
— La dracu’! Ce-ai făcut? Soțul ei vine încoace. Ești terminat.
Dar starea mea alcoolică a pornit modul „mi se rupe”. Am ieșit să le conduc afară și atunci îl văd pe soțul ei cum oprește mașina. Fetele m-au împins imediat și m-au băgat înapoi în bar.

Stau eu așa la bar și îl văd pe soț cum vine direct spre mine și se așază pe scaun.

— Bună seara. Doriți să comandați ceva?
— Dă-mi 50 de grame de vodcă.
— S-a întâmplat ceva?
— Da.
— Atunci poate 100?
— Hai, 100 pentru mine și 100 pentru tine.

Ne torn câte 100 de grame de vodcă și mă prefac că nu știu nimic. Iar în capul meu e un haos. Pe de o parte, îmi amintesc cum stătea ea în patru labe acum 15 minute. Pe de altă parte, mi-e frică să nu mă omoare.

— Și ce s-a întâmplat?
— Ascultă! Spune-mi, te rog, cine e aici chelnerul înalt, slab, drăguț?
— La noi parcă toți sunt scunzi și mai plinuți.
— Tu ai voie să ieși de după bar?
— Nu, desigur. La începutul turei, la 22:00, merg la toaletă și următoarea dată pot merge abia la 5 dimineața. Nu avem voie să părăsim barul. De ce?
— Pentru că unul s-a prezentat drept chelner și a futut-o pe viitoarea mea soție. Mâine avem nunta.
— Du-te dracu’! — am spus eu, ca și cum aș fi auzit asta prima oară. Deși mi se întâmpla aproape zilnic.
— Da. Așa ceva se întâmplă.

În noaptea aia am băut o sticlă de vodcă la doi. De multe ori mă mânca linba să-i spun că eu am fost ăla. Tipul era chiar un om bun.

A doua zi a venit în bar printre primii clienți.

— Max! Salut, prietene.
— Salut! Nu trebuia să fii la nuntă?
— Eu? Să mă însor cu o curvă? Maxim, chiar mă crezi idiot? Ieri noapte și azi dimineață am trimis tuturor SMS că anulăm nunta. N-o să trăiesc niciodată cu o curvă. Ba mai mult, Max! Îi sunt recunoscător tipului care a futut-o. Mi-a arătat ce mă așteaptă în viață. Nu vreau s-o prind prin paturile altora. Am o rugăminte. O să auzi de povestea asta. Poți să-i dai celui care a futut-o 100 de dolari din partea mea. Ca mulțumire că mi-a deschis ochii.

— Ce poveste… Sincer, eu nu i-aș fi spus. Un bărbat într-un asemenea moment e capabil de orice. Am avut și eu o situație asemănătoare. Dar a fost demult și o țin minte rău, — a spus Maxim.
— Cred că a fost decizia corectă să nu-i spună. Cum credeți, Maxim, a primit el o lecție de viață?
— Cred că amândoi au primit-o. El va alege mai atent femeia cu care vrea să-și construiască viața. Ea va purta o traumă pe viață și rușinea familiei. Sunt sigur că toată ruda a aflat ce a făcut. Dar, cunoscând fetele din ziua de azi, pot spune că nu au niciun pic de rușine. Nu mai sunt vremurile când o femeie divorțată nu mai era bună de nimic și era o rușine. Acum morala e mult mai stricată decât înainte.
— Credeți că e vorba de morală sau de slăbiciune? Judecând după toate, Maxim era un tip foarte frumos și poate ea pur și simplu n-a rezistat.
— Oricât de frumos ar fi un bărbat, trebuie să ai demnitate și fidelitate. Doar pe principiile astea se poate construi o familie sănătoasă.
— Dar poate nu primea de la el atenția de care avea nevoie?
— Prea deșteaptă ești, Alice. Citește mai departe, te rog. Că deja avem aici un dialog între un om și una care știe toate răspunsurile de pe Google.

 Luând cei 100 de dolari, am vrut să-i spun că eu sunt tipul. Dar m-am abținut. Eram șocat de reacția lui. Nu-l căuta ca să-l omoare, nu făcea scandal, ci doar dădea bani și mulțumea celui care i-a deschis ochii. Poate i-am distrus viața prin fapta mea, sau poate chiar l-am ajutat. Am băut enorm în noaptea aceea. Desigur, mi-a dat cartea lui de vizită, iar ce era scris pe ea m-a îngrozit și mai tare. Din păcate, nu pot spune cine era. Dar asemenea oameni decid soarta altora.

— Un procuror, probabil. Sau un judecător. Altfel nu se mai dau cărți de vizită azi. Ce crezi, Alice?
— Mulți oameni folosesc cărți de vizită pentru a-și sublinia statutul.
— Hm. Statut… Continuă, Alice.

Toate aceste povești se întâmplau în fiecare zi. Se adunaseră atât de multe încât nici nu le mai puteam ține minte. Nicio zi nu semăna cu alta. Întotdeauna era ceva interesant. Și a venit momentul în care am înțeles că toate astea sunt mișto — să ai pe cine vrei — dar aș fi vrut să simt ceva față de un om, nu doar sex. Aș fi vrut să văd pe cineva și a doua și a treia oară. Dar, din păcate, toți cei care apăreau voiau doar să se fută. Iar eu, trăind 99% din viață sub alcool, voiam doar să le fut și să mă trezesc cu mahmureală, auzind cuvintele: „Max! Închide ușa după mine. Plec.”

— Eroul ăsta e exact ca mine! — a spus Maxim cu mândrie.
— Maxim, aveți un stil de viață foarte asemănător cu al lui. Pot continua lectura?
— Alice, nici să nu mă întrebi. Doar citește și nu băga în seamă comentariile mele.

  Așa s-a nimerit că perioada în care lucram acolo a coincis cu un salt tehnologic global — a apărut primul iPhone din lume. Și ghiciți când l-am avut eu? Exact atunci când a apărut la vânzare în SUA. Mi l-au adus în Moldova niște cunoscuți care se întorceau din programul Work and Travel. Costa o grămadă de bani. Dar eu aveam bani. Știți bine: unde sunt alcool și prostituate, sunt și bani mulți. Oficial câștigam 100 de dolari pe săptămână. Dar aproape niciodată nu luam salariul, pentru că din bacșiș făceam 300–400 de dolari pe zi. Doar pentru că îi spuneam fetelor care lucrau ce client e interesat de ele, primeam 100 de dolari. Și erau multe astfel de fete. Iar banii îi împărțeam între noi.

  Odată cu apariția iPhone-ului, trebuia să te înregistrezi pe rețelele sociale. Atunci existau două rețele populare în Moldova și în lume: Facebook și Odnoklassniki. Eram pe amândouă. Algoritmii au început să-mi arate oameni pe care i-aș putea cunoaște — din oraș, din școală. Listele erau mari, dar atenția mi-a fost atrasă de o fată. O chema Liza.

— Și eu am avut o Liză. Prea multe coincidențe cu eroul ăsta. Îmi amintesc vag ce-a fost între noi. Continuă, Alice, poate-mi amintesc ceva, — a spus Maxim.

A fost prima fată din viața mea căreia i-am trimis cerere fără s-o cunosc. A acceptat repede. Și a apărut dilema: ce-i scriu? Eu, în ultimii ani, vorbeam doar cu fete beate sau cu cele gata de orice. Nu trebuia să inventez nimic. Mă uitam la profilul ei, analizând de ce să mă leg. Avea puține poze. Mai exact două: una — portret, cealaltă — stătea cu spatele, dar picioarele i se vedeau clar. Niște picioare ireal de frumoase. Le-am privit mult timp. Sunt Pești după zodiac, iar noi o luăm razna după picioare frumoase. Picioarele sunt slăbiciunea noastră. Iar picioarele Lizei erau cea mai mare slăbiciune din viața mea. Așa că am început cu asta:
— Salut. Ai niște picioare ireal de frumoase.
 Credeam că e un mesaj original. Și credeți că mi-a răspuns? Nici vorbă. A citit și atât. Atât! Vă dați seama? L-a citit și n-a răspuns. A fost o lovitură pentru orgoliul meu. Eu, care în fiecare zi fut fără să spun un cuvânt, iar aici — Liza, care nu-mi răspunde. Așa că am decis să rezolv problema. Al doilea mesaj a fost:
— Ai probleme cu degetele sau mi se pare?
Și ea a întrebat:
— De ce?
— Îți scriu și nu răspunzi. M-am gândit că ai probleme cu degetele. Am un prieten traumatolog, voiam să te ajut.
— Hahaha. Nu, n-am probleme. Doar că nu comunic cu necunoscuți.
— Dar m-ai adăugat în prieteni și nu te-a deranjat că nu ne cunoaștem.
— Pot să te șterg.
— Nu, nu. Stai. Avem totuși multe în comun.
— De exemplu?
— Îl știi pe Lenin?
— Da.
— Și eu îl știu. Vezi? Avem deja ceva în comun.
— Hahaha. Original.
— De fapt, nu știu cum să vorbesc aici și cum să invit fetele la întâlniri. Ești una dintre primele pe care le-am adăugat.
— Dacă e un indiciu, nu ies nicăieri. Putem vorbi aici. Poate într-o zi voi ieși. Dar acum am un iubit.
— E un iubit bun?
— Cel mai bun.
— Dar eu sunt bun?
— Tu ești doar Maxim, care mi-a atras atenția. Nimic mai mult.
— Bine, Elizabeth. Atunci îți scriu mâine. Începe munca, trebuie să fug.
— Unde lucrezi?
— Ooo… Ai început să te interesezi de mine. Ai grijă, că te desparți de iubit.
— Nu mă despart. Unde lucrezi și ce faci?
— Lucrez barman într-un cocktail-bar.
— N-am auzit să existe așa ceva la noi în oraș.
— Și mai bine. Ai un mare plus din partea mea.
— De ce e bine?
— E un loc cu o reputație nu tocmai bună.
— Cum adică?
— Îți povestesc altădată, când am timp.
— Cum vrei. Să ai spor la muncă.
— Mulțumesc. Îți scriu când sunt liber.

Această conversație scurtă a lăsat o urmă în mine. La muncă nu făceam decât să aștept o clipă liberă ca să-i scriu. Mesajele noastre erau banale. De genul:
— Liza! Ești aici?
— Da.
— Te-ai despărțit de iubit?
— Nu.
— Ok. Îți scriu peste 10 minute. Poate se schimbă ceva.
— Hahaha.

  Desigur, îi disprețuiesc pe cei care scriu fetelor chiar și după ce ele spun că sunt într-o relație. Dar sunt momente când înțelegi că e omul tău și trebuie să o cucerești. Mai ales că îți răspunde. Asta înseamnă ori că e nefericită în relație, ori că se distrează. Și ambele variante îți dau o șansă. Și există o problemă mare și un sfat pentru toți băieții: dacă îți scrie o fată care e într-o relație și, printr-un miracol, se desparte și începe să se vadă cu tine, nu te bucura prea repede. După un timp, va scrie altor băieți și când va fi cu tine.

— Aici a punctat bine, — i-a spus Maxim lui Alice.

  Ne-am scris zilnic o perioadă foarte lungă. Niciodată nu mi-aș fi imaginat că m-aș îndrăgosti de un om doar citind mesaje. Fără s-o văd, fără să-i aud vocea. Nu-mi dădea numărul de telefon. Imaginați-vă că ne certam în mesaje și chiar ne despărțeam. Certurile erau dese, pentru că eu voiam s-o văd, iar ea nu voia deloc. Dar mesajele noastre au început să capete altă formă. Apărea gelozia, supărările dacă nu scriam sau nu răspundeam. Ea știa deja unde lucrez și cu cine. Dacă nu răspundeam, imediat venea mesajul: „Iar cu curvele tale?” Dar nu puteam să-i explic că ele nu mă interesează și că e doar muncă. Și chiar așa era. Odată cu apariția ei, nu mă mai interesa nimeni. Toate gândurile erau doar despre ea.

— Da, da, da! Spune asta altcuiva. Nu-l interesau alte fete. Alice, tu chiar crezi asta? El e într-un local plin de prostituate și se gândește doar la o fată pe care nici măcar n-a văzut-o?
— Dragostea este un sentiment imprevizibil, capabil să schimbe oamenii.
— Da, da, da. Alice, tu crezi în basme? Citește mai departe.

Nu posta fotografii public, mi le trimitea doar mie. Cu fiecare poză înțelegeam că mă îndrăgostesc tot mai tare.
  Așa a durat aproape doi ani. În tot timpul ăsta nu m-am atins de nicio fată. Toate fetele din jurul meu nu mă mai recunoșteau. Erau gata de orice doar ca să se culce cu mine. Îmi ofereau chiar bani. Dar de fiecare dată refuzam. Scoteam telefonul, le arătam poza Lizei și le spuneam:
— O vedeți pe ea? Ei nu pot să-i fiu infidel. Iar voi nu valorați nici măcar cât degetul ei. Niciun ban nu vă ajută.
  Acesta era argumentul meu.

  Timpul trecea, certurile deveneau tot mai dese. La un moment dat am înțeles că probabil nu va duce nicăieri și am decis să nu-i mai scriu, ca să văd ce va face ea. Liza m-a jucat și aici. Nici ea nu mi-a scris. Am crezut că nu-mi scrie pentru că îi sunt indiferent. Dar s-a nimerit că eram legați mental și exact în momentul în care am decis s-o testez, ea a decis același lucru. N-am vorbit aproape trei luni. A fost un test bun. Dar pentru mine a fost extrem de greu. Eram îndrăgostit de ea.
  După trei luni, când nu mai suportam, am decis să-i scriu:
— Elizabeth!
— Maxim!
— Ați dispărut puțin.
— Și dumneavoastră, Maxim.
— Elizabeth! În timpul ăsta v-ați gândit la propunerea de a ne întâlni?
— Da.
— Și ce ați decis?
— Am decis că nu ne vom întâlni.
— La dracu’, Liza, cât se mai poate? De ce nu vrei să ne vedem? Care e motivul?
— Nu mi-ai scris trei luni ca să mă cerți? Nu vreau și gata.
— Nu poate fi doar pentru că nu vrei.
— Poate. Pur și simplu nu vreau.
— Liza! Vreau să te văd. Se poate rezolva cumva?
— Dacă îți trebuie, rezolvă singur.
 Era foarte dură în mesajele de genul ăsta. Era clar că, dacă ne vom întâlni, va fi doar când va vrea ea.
— Bine, Liza. Dacă nu, atunci nu. Vreau doar să-ți spun că mi-a fost dor de tine tot timpul ăsta.
— Și mie mi-a fost dor. Au fost cele mai liniștite trei luni din viața mea. Zero scandaluri.
— Hahaha. Mulțumesc pentru sinceritate.
— Chiar așa, uitasem cum e să te cerți.
— Promit să nu mai fac asta.
— O să mă prefac că te cred.
— Chiar mi-a fost foarte dor.
— Și mie.

Toată ziua am vorbit despre ce ni s-a întâmplat în perioada asta. Am înțeles că nu mai vreau să dispar din viața ei. Aveam nevoie să știu fiecare minut al ei.

Într-o zi, fiind la muncă, am întâlnit întâmplător o colegă de clasă de-a ei. Ea nu mă cunoștea, dar eu am recunoscut-o imediat. Liza îmi trimitea des poze cu ea. M-am apropiat și am întrebat-o:
— Salut. Spune-mi, te rog, ești colega de clasă a Lizei?
— Da! Dar tu de unde o știi?
— Îmi trimitea des poze cu tine și spunea că ești cea mai bună prietenă a ei.
— Așa e. Suntem prietene.
— Spune-mi, te rog, cum e ea?
— E o fată foarte bună. Frumoasă, blândă, gospodină. Ți-a plăcut?
— Vorbesc cu ea de peste doi ani, dar nu vrea să se întâlnească cu mine.
— Așa e Liza. Iese rar. Părinții sunt plecați peste hotare, iar ea stă acasă cu fratele mai mic.
— I-am propus să iasă cu el.
— Nu cred că va vrea. Controlul părinților e foarte strict.
— Știu de părinți și de frate. Dar măcar cinci minute să ne vedem nu se poate?
— Se va vedea când va putea. Acum nu există această posibilitate.
— Am înțeles. Bine. Mulțumesc oricum. Dacă o vezi, spune-i că e cea mai frumoasă.
— O să-i transmit.

A doua zi am decis să fac un gest extrem și s-o păcălesc pe Liza, scriindu-i:
— Liza! Ești aici?
— Da.
— Ieri am văzut-o pe prietena ta. Nu mă așteptam să spună așa ceva despre tine.
— Ce a spus?
— Dă-mi numărul tău și îți spun. Nu vreau să scriu, pentru că i-ai arăta mesajele.
— Nu-ți dau numărul. Scrie ce a spus.
— Nu. Doar la telefon.
— Ori scrii, ori nu mă interesează ce a spus.
— Doar la telefon, Liza. Nu există altă variantă.
— Nu ți-l dau. O zi bună, Maxim. Fug la oră.

Știam că e foarte curioasă când e vorba de ea și că va scrie. Avea numărul meu din primele zile. Și după o oră văd apel de la un număr necunoscut.

— Alo!
— Salut! Spune ce a spus? — vocea ei era atât de blândă, încât era greu de crezut că poate fi dură.
— A spus că ești foarte frumoasă și o fată bună.
— Maxim, ești idiot? Am întrebat-o de o sută de ori ce ți-a spus! Toată ora m-am gândit că o să-mi pierd prietena, iar tu îmi spui asta?
— Ți-am zis că nici nu mă gândeam să spună așa ceva.
— Maxim, chiar ești idiot.
— Dar acum am numărul tău.
— Ți-au trebuit doi ani să-ți vină ideea asta?
— Se pare că da.
— Nu e o variantă prea bună pentru viață.
— Cu ce nu te mulțumesc?
— Ești lent.
— Nu e cel mai rău lucru la un om.
— Bine, Maxim. Ai numărul, dar nu mă suna, bine?
— De ce să nu sun? Vreau să-ți aud vocea.
— Nu răspund nici dacă mă suni toată ziua. O zi bună.

Și Liza și-a ținut cuvântul. Nu a răspuns la niciun apel, oricât am încercat. Eu sunam, iar ea îmi trimitea mesaje în care îmi spunea să nu o sun, ci să-i scriu.

— Foc, nu fată. Dar și el, bineînțeles, a găsit cum să-i obțină numărul. Nu contează că i-au trebuit doi ani. Se vede clar că e un tip descurcăreț. Din al doilea mesaj i-a atras atenția și cred că mai departe i-a fost interesant doar pentru că o surprindea în fiecare zi, — a spus Maxim, privind tavanul, cufundat în gânduri.
`
    },
    {
        id: 'ch2',
        title: 'El / Ea',
        content: `
— Alice, cum crezi, o va vedea? Sau toată cartea va fi despre cum el îi scrie, iar ea nu vrea să-l vadă?
— Tot ce e mai interesant abia urmează, Maxim. E un roman care îți va da viața peste cap.
— Hai să gândim logic. Nu se poate ca timp de doi ani să fi comunicat și să nu se fi văzut. E absurd. Asta se întâmplă doar în filme.
— Fiecare film e bazat pe fapte reale. La fel și cărțile. Nu credeți în iubirea lor?
— Poate că asta e iubire. Dar e al naibii de ciudată. Hai, citește mai departe și să vedem ce e cu ei.

Trecuse mai puțin de o săptămână de când primisem numărul ei de telefon, când deodată mi-a sunat telefonul și pe ecran scria numele LIZA.
— Nu-mi vine să cred că m-ai sunat tu?
— Da! — a spus ea râzând.
— Ce s-a întâmplat? Aproape că mi-am scăpat telefonul din mână.
— Ești la muncă?
— Da.
— Vin acum.
— Adică vii? Unde? De ce?
— La Deja Vu.
— Știi să surprinzi. Ok, te aștept.

Ea a făcut zece minute pe drum, dar mie mi s-a părut că au trecut ani. Tot timpul ăsta mă gândeam ce să-i spun. Mă frământam, eram nervos. S-o îmbrățișez sau nu? Să-i strâng mâna sau nu? S-o sărut sau nu? Eram ca un puști de șaisprezece ani la prima întâlnire. Și atunci aud ușa deschizându-se și intră ea. Mică de statură, fragilă, o fată frumoasă cu cel mai frumos zâmbet din lume. Îmi întinde mâna și, bineînțeles, o întind și eu pe a mea. Nu-mi vine să cred că o țin de mână și mă uit în ochii ei. Aproape doi ani trecuseră de când ne trimiseserăm primele scrisori.

— Ei bine, salut. Nu te așteptai?
— Azi chiar nu. Ce s-a întâmplat?
— M-au invitat la o zi de naștere și am încurcat puțin ora. Credeam că începe la 18, dar începe la 19. Și am decis că, dacă tot sunt prin zonă, să stau puțin cu tine.
— Nu puteai să încurci ora la toate zilele de naștere?
— Nu puteam. — A râs. Avea un simț al umorului foarte bine dezvoltat. Și a propus să ne așezăm undeva, dar nu acolo unde stau toate curvele.
— Atunci va trebui să mergem în alt local.
— Bine, hai să ne așezăm acolo unde nu rămân gravidă de la canapea.
— Canapelele noastre au văzut multe, la propriu. Vrei ceva de băut?
— Rom cu cola.
— Alegere bună. De unde știi combinația asta? Parcă stai mereu acasă?!
— Eh, Maximka! Mai sunt multe pe care nu le știi.

Râsul ei pur și simplu mă omora. Mă uitam la ea și nu-mi venea să cred că e lângă mine. Că o văd și pot vorbi cu ea. Am stat vreo patruzeci de minute, dar pentru mine au fost cele mai minunate minute din ultimii ani. S-a uitat la ceas și a spus:
— Trebuie să plec. Nu-mi place să fiu așteptată.
— Nu-ți place să fii așteptată? Îmi spui, te rog, cât timp te-am așteptat eu? Nu-i place, cică. M-ai făcut să râd acum. Mai vii pe la mine azi?
— Vin după ziua de naștere.
— Te voi aștepta. Poți veni chiar și fără să suni sau să scrii.
— Ok. Fug. Mi-a făcut mare plăcere să petrec timp cu tine.
— Și mie.

Ne-am luat rămas-bun și ea a plecat, lăsându-mă la masă cu un zâmbet pe față. Am mai stat încă o jumătate de oră și nu-mi reveneam.

— Și atât? Asta e tot ce poate povesti despre prima întâlnire? Autorul, desigur, nu e deloc romantic în descrieri. Unde e descrierea părului ei pe cinci pagini? Unde e cum se uita la el și el a văzut iubirea și oceanul în ochii ei? Unde e descrierea parfumului și machiajului? Suta la sută s-a pregătit pentru ziua de naștere, deci era pur și simplu superbă. Literatura modernă chiar a pierdut romantismul. — spuse Maxim mirat, ținând un pahar de vin în mână. Citește mai departe, Alice!

— Max! O să pregătești barul? — m-a întrebat colegul meu, care tot timpul ăsta făcuse singur toată treaba.
— Desigur. Te ajut imediat. Pur și simplu nu-mi pot reveni.
— Cine e fata asta?
— E fata despre care ți-am vorbit.
— Liza?
— Da.
— Și ce a spus? Când vă vedeți data viitoare?
— A spus că mai trece azi.
— Max, și tu chiar crezi asta? Ai văzut-o? Ce treabă ai tu cu ea? Ai văzut cât e de frumoasă?
— Pariez că vine.
— Pe o sticlă de Corona. Nu vreau să te cheltui dacă nu vine.

Ne-am strâns mâinile. Sincer, mă îndoiam că va veni, dar credeam. Stând la bar, tot ce făceam era să mă uit la ușă și s-o aștept. Și deodată intră. Zâmbea la fel, dar era în compania unor băieți. M-am bucurat și am fost gelos în același timp.
— Ce? Nu mă așteptai?
— Ba da. Cine sunt băieții?
— Sunt prietenii mei. După ziua de naștere am decis să venim. I-am convins eu.
— Atunci ce beți? Lasă că vă fac eu cinste.

Liza a ales cocktailurile pentru toți și s-a dus în mijlocul ringului de dans. Dansa și se uita la mine. Înțelegeam că îi plăceam. O privire îndrăgostită nu o poți confunda cu nimic. La un moment dat am uitat chiar și de muncă. Prostituatele tot veneau la ea și o întrebau cine e. Credeau că e o concurentă și chiar voiau s-o atragă în gașca lor. Dar Lizei nu-i păsa. Se distra la maxim.

Spre închidere a rămas singură, prietenii ei plecaseră, și s-a așezat lângă mine la bar.
— Când termini?
— Când pleacă toți clienții.
— Pot rămâne cu tine până la închidere?
— Desigur. Nici nu se discută. Dacă vrei, pot pleca și acum și să te conduc.
— Nu. Fă-ți treaba, te aștept și plecăm împreună.

Ora rămasă am lucrat sub privirea ei atentă. Se uita și mă admira. Mă simțeam ca o vedetă la un concert la care venise ea. După ce am terminat, i-am propus s-o conduc acasă, nu voiam să meargă singură. Ne-am așezat pe bancheta din spate a taxiului și ea a dictat adresa. M-a amuzat teribil.
— De ce râzi?
— Aproape doi ani nu mi-ai dat numărul, nu voiai să te întâlnești cu mine. Iar azi m-ai văzut, ai venit din nou să mă vezi și acum îmi spui adresa fără probleme și te duc acasă.

S-a uitat la mine zâmbind și n-a spus nimic. Din privire era clar totul. Ajunși, am coborât, i-am deschis ușa și i-am întins mâna. Știam că îi place să fie tratată ca o adevărată domnișoară.
— Aici locuiesc. Mulțumesc, Maxim, pentru noaptea asta. O voi ține minte mult timp.
— Mulțumesc și eu, Liza, că ai venit. Dar e o problemă. Te conduc până la apartament.
— Maxim, locuiesc la etajul trei. Ce mi se poate întâmpla?
— Dar dacă sunt drogați pe scări?
— Ce drogați, Maxim? Stai liniștit aici.
— Te conduc până la ușă.
— Dumnezeule, ce m-ai enervat! Bine! Hai, condu-mă, — a spus nervoasă și a pornit înainte.

Mergeam pe scări în urma ei și știți ce făceam? Mă uitam la picioarele și la fundul ei. Nu puteam să-mi înving instinctul de bărbat care vrea mereu pe cineva. Iar când ai în față fundul fetei la care ai visat, te atrage și mai tare.
— Am ajuns. Ai văzut mulți drogați?
— Liza! Te voi conduce mereu până la ușă. Nu contează dacă suntem împreună sau certați, te voi conduce până la ușă. Clar?
— Ce om ești tu, Maxim? Bine. Vrei? Condu-mă.

— Noapte bună, Liza. Și mulțumesc încă o dată că ai venit.

M-a îmbrățișat și în acel moment am simțit-o. M-a îmbrățișat așa cum nimeni nu m-a îmbrățișat vreodată. Nu voiam să-i dau drumul, dar ea a făcut-o pentru mine. Știa să păstreze distanța. Scoțând cheile și aruncându-mi o privire, mi-a urat noapte bună și a intrat în apartament. Când m-am urcat în taxi, primul lucru pe care l-am făcut a fost să-i formez numărul.

— Dormi?
— Maxim, ai plecat acum un minut. Cum aș putea să adorm așa repede?
— Pur și simplu mi-a fost dor.
— Într-un minut?
— Într-o secundă.
— Mda, Maxim. O să avem probleme.
— De ce?
— Nu-mi place când primesc atâta atenție.
— Iar mie îmi place să mă dedic complet unui om.

Am vorbit tot drumul până la casa mea. Chiar și după ce am intrat și ne-am luat rămas-bun pentru a suta oară, voiam s-o sun din nou. Nu puteam trăi fără ea nici măcar o secundă. Nu pot descrie în cuvinte ce simțeam atunci, dar era o senzație foarte bună.

— Cât de enervant e. Am vorbit cu multe fete și toate spuneau că nu le place prea multă atenție. Alice, ce spune internetul despre asta?

— Depinde ce consideri atenție excesivă. Dacă sunt cadouri zilnice, fata nu-ți va spune că nu-i place. Dar dacă sunt cinci mii de mesaje de dimineață, atunci e deja insistență. Multe cupluri se despart pentru că sentimentele se răcesc și atenția scade.

— M-ai convins. Uite până unde a ajuns progresul dacă Alice m-a convins. Citește mai departe.

  Din acel moment totul a luat-o razna între noi. Venea la mine la muncă aproape în fiecare zi și rămânea până la închidere. Iar eu o conduceam mereu până la ușă. O amuza și chiar spunea că vrea să se înțeleagă cu niște drogați într-o zi, să o aștepte pe scări, ca eforturile mele să nu fie degeaba.

După o săptămână, într-o astfel de noapte, am condus-o din nou până la ușă. Și atunci, stând cu două trepte mai jos, m-a sărutat. Ce buze moi avea! Se săruta și se îmbrățișa cu atâta pasiune încât ne auzea tot blocul. Limba ei nu înceta să o caute pe a mea, și era extrem de pasional. M-am gândit că încă puțin și vom face sex chiar pe scări. Dar eram conștient că prima mea dată cu ea trebuie să fie specială. Voiam să fie frumos, ceva ce eu și ea să ne amintim mult timp. Am întrerupt sărutul și i-am cerut să se calmeze. Dar ea a continuat să mă sărute cu săruturi scurte și, la final, s-a lipit de pieptul meu. Stând în tăcere și simțindu-i bătăile inimii, am înțeles că asta e iubirea. Nu puteam și nu voiam să ne lăsăm unul pe altul să plece. Dar trebuia să ne despărțim, era deja târziu. Știți cum am coborât scările? Băieții mă vor înțelege, pentru că știu cât de greu e să cobori scările cu pula sculată, și încă așa încât să nu te prindă nimeni. De la intrare până la taxi mergeam cu mâinile în buzunare, ca și cum căutam ceva. De fapt, doar îmi camuflam erecția.

— O, da. Nu e deloc simplu când ți se scoală și nu vrei să te faci de râs. Oare fetele știu că folosim trucul ăsta?

— Fetele știu foarte multe despre bărbați, doar că ascund asta.
`
    },
    {
        id: 'ch3',
        title: 'Acolo unde se șterg granițele',
        content: `
 Puțin despre mine. Toată viața am crescut și am trăit în Chișinău. Așa s-a întâmplat că sora mea mai mică s-a măritat cu un tip a cărui întreagă familie era dintr-un sătuc mic din raionul Călărași. Sincer, treceam des pe lângă sate, dar nu fusesem niciodată prin ele. Și auzisem multe despre ospitalitatea oamenilor de la țară.

  Într-o zi de vară sora m-a sunat și mi-a propus să merg cu ea și cu soțul ei la țară. La început am refuzat, pentru că nu știam cum se trăiește acolo și nici rudele cumnatului nu le cunoșteam, dar sora m-a convins spunând că va fi o experiență bună și o pauză de la agitația orașului. A fost doar o condiție din partea mea — merg acolo cu Liza. Sora a fost de acord. Mai rămânea un singur lucru - să-i spun Lizei, care urăște genul ăsta de surprize și îmi cere mereu să discutăm împreună asemenea decizii. Strângându-mi toate emoțiile într-o cutie, am sunat-o pe Liza:

— Salut, iubirea mea! Vreau să-ți spun că mâine plecăm noi doi, împreună cu familia surorii mele, la țară, la cumnatul meu și rudele lui.
— Maxim, ai stat iar prea mult în soare? Ce sat?
— E în raionul Călărași.
— Nu-mi pasă unde e. De ce mă pui în fața faptului împlinit fără să mă întrebi dacă vreau?
— Liza mea frumoasă și dulce, imaginează-ți doar că prima dată merg într-un loc unde n-am mai fost niciodată cu tine. Cu cea mai frumoasă fată din lume. Vom bea vin, vom mânca bine, vom sta la foc fără telefoane și semnal. Nu-i perfect?
— Și ce ne împiedică să facem asta în Chișinău? Of, Maxim… Mergem, dar te rog pentru a suta oară consultă-mă înainte să iei astfel de decizii.
  A doua zi am trecut cu sora pe la Liza și am pornit spre sat. Zi toridă, soare puternic. Trecând prin orașe și sate, nu făceam altceva decât să admirăm cât de frumoasă e țara noastră. Liza se mira la fiecare colț și mă trăgea de mână când vedea ceva frumos. Ajunși la poartă, ne întâmpina o bunică micuță și drăguță. S-a prezentat și ne-a îmbrățișat pe fiecare.

— Bine ați venit, masa e pusă.
— Mulțumim mult, dar nu trebuia să vă pregătiți așa.
— În Moldova trebuie să fii mereu gata de oaspeți. Așa că nici nu m-am străduit prea tare azi.

— Vă mulțumesc. Pot să vă întreb unde pot bea niște apă? Drumul a fost lung și sufocant.
— Maxim, trebuie să te dezamăgesc, dar n-am apă. Sunt bătrână și nu pot căra singură apa de la fântâna care e departe. Vecinii mi-o aduc de obicei, dar azi n-au ajuns încă.
— Atunci o aducem noi. Avem mașină.
— Nu trebuie. O aduc vecinii. Eu îți aduc acum vin rece și bun din beci. După ce-l bei, vei înțelege de ce salvează de căldură, de ce trăiesc atât și de ce nu mă panichez dacă n-am apă.

  Ce trebuie să știi despre Moldova? Vin, fete frumoase, ospitalitate. Toate erau pe masă atunci. Beam vin din pahar în pahar și nici n-am realizat cum ne-am îmbătat în câteva ore. Liza mă trăgea de mână de fiecare dată când duceam paharul la gură, semn să nu exagerez, iar eu îi șopteam că e totul ok. Știa că nu fac scandal când beau și că, dacă mă îmbăt, adorm. Exact asta s-a întâmplat. Eram deja la nivelul la care voiam doar să îmbrățișez perna. Nu-mi amintesc cum am ajuns în pat, dar îmi amintesc perfect cum m-am trezit. Capul mă durea, iar lângă mine era Liza, care mă mângâia pe obraz cu mâna ei delicată și mă privea. Nici nu s-a gândit să mă certe.

— E atât de frumos să deschid ochii și să te văd, i-am spus, sărutându-i buzele dulci cu săruturi scurte.
— E o veste proastă, Maxim. Vecinii tot n-au adus apă.
— Asta înseamnă că trebuie să bem iar vin?
— Ai vrut să vezi cum trăiesc oamenii la țară? Așa trăiesc.

Anticipând: patru zile n-am băut apă. Peste tot era doar vin.

  Spre seară în prima zi am înțeles că trebuie să dormim împreună cu Liza. Prima noapte întreagă în același pat. Casa avea doar două camera - una pentru bunică, alta pentru sora mea și cumnat. Nouă ne-au propus să dormim pe coridor. Liza era în șoc, și eu la fel. Cel mai tare e că nu era canapea. Știți pe ce am dormit? Pe antrezolă. Da, pe partea de sus a dulapului. Am coborât-o pe jos și am întins două pături groase.
Coridorul era îngust, cu ferestre pe ambele părți. Unele dădeau în curte, altele nu se vedea unde duc. Ne-am culcat puțin beți, știind ce urma. Inima bătea al dracu’. Ca prima oară. Ne-am dezbrăcat. Ea s-a întors cu spatele la mine, cu capul pe brațul meu. Am îmbrățișat-o și am început să-i sărut gâtul. Îi plăcea. Când îi treceam limba pe gât, gemea. O sărutam încet, fără grabă. Respira tot mai repede și se lipea cu fundul de pula mea. Îmi săruta mâna care o ținea. Totul era lent. Simțeam fiecare mișcare. Am băgat mâna în chiloții ei, iar ea și-a depărtat picioarele. Era foarte udă. Am încercat să-i bag un deget, dar era atât de strâmt încât nu puteam. S-a întors spre mine și m-a sărutat cu pasiune, gemând de parcă ar fi terminat deja. Mi-a luat mâna și s-a masat cu ea, mușcându-mi buzele până la sânge. Și-a dat chiloții jos și s-a așezat deasupra. Foarte încet. Când am intrat în ea, am simțit cât de fierbinte și cât de strâmt e acolo. Se mișca încet, pasional. A terminat, tremura. S-a prăbușit peste mine. Eu încă eram în ea. Mi-a spus „gata” și m-a îmbrățișat. Am continuat. Când am accelerat, s-a ridicat din nou și și-a frecat clitorisul de mine. A mai terminat o dată.

— Gata, Maxim, gata! Nu mai pot! Am terminat de două ori în câteva minute. Tu cine dracu’ ești? Ce mi-ai făcut?

După câteva mișcări am terminat și eu. În ea. O țineam în brațe. Tăcere.

— Liza.
— A?
— Unde ne spălăm dacă nu e apă?
— Bă, Maxim, doar tu poți strica un moment atât de frumos cu o întrebare atât de tâmpită.

  Dimineața am văzut că ferestrele dădeau direct în camera bunicii. Dormea lângă ele. Sigur ne-a auzit.

 Ca de obicei,dejunul, a început cu vin. Bunica se uita la noi cu un zâmbet șiret, iar eu și Liza zâmbeam de fiecare dată când observam asta. În ziua aceea ne-am îmbătat bine. După tradițiile moldovenești, dacă ai venit în satul natal, trebuie să treci pe la toate rudele. Fiecare e obligat să te primească în casă, să te îmbete cu vin și să te hrănească. Fiecare își laudă vinul și te obligă să-l guști. Și nici să nu-ți treacă prin cap să spui că nu-ți place. Chiar dacă bei cea mai mare borhotină acră din viața ta, trebuie s-o lauzi. Am trecut pe la trei case din zece planificate, după care picioarele lui Maxim au refuzat să mai asculte.

Dimineața următoare, cu o mahmureală sălbatică, am ieșit în curte unde bunica ne pregătise zama tradițională moldovenească — supă anti-mahmureală pe bază de pui, cu acrișor. Când am văzut zama, m-am bucurat sincer,pentru că știam că în câteva ore îmi voi reveni. M-am așezat la masă, am luat lingura și am auzit cum bunica a strigat:
— Stați! Nu mâncați încă!

A fugit în grădină și s-a întors cu o legătură de pătrunjel, pe care a aruncat-o în zamă pentru gust.
Toți au început să mănânce ca niște sălbatici. Doar eu nu mâncam. Cumnatul, terminând ultimele linguri, s-a uitat la mine și a întrebat:
— Tu de ce nu mănânci?
— Ții minte că ieri, când am venit de la oaspeți, ne-am pișat în grădină?
— Da!
— Ei bine, eu țin minte clar cum m-am pișat exact pe pătrunjelul ăsta.
— Fu-te-n gură, Maxim! De ce dracu’ nu mi-ai spus? Ce pizdă mă-sii…

Râdeam ca un apucat. Toată masa mă înjura cum putea. Mie îmi era în același timp și rău, și al dracului de amuzant. Chiar și Liza, care mânca zama, râdea cu mine în hohote. Mereu m-a apreciat pentru umor și glume.
  Așa au trecut cele patru zile în sat. Când plecam și ne luam rămas-bun de la bunică la poartă, am observat brusc că lângă intrare era o fântână. N-o văzusem deloc până atunci și am întrebat-o:
— Bunico, dar aici e fântâna. De ce ați spus că e departe și că n-aveți apă?
— Se vede că nu ești de la țară, Maxim. În curând începe recolta și trebuie să facem vin nou. Unde să-l punem dacă toate butoaiele sunt pline? De-aia bem toată vara, să le golim. Vinul nu se aruncă — e muncă. Voi m-ați ajutat să scap de o parte din el.

Mda. Cred că atunci am început să înțeleg de ce la țară oamenii beau mereu.

— Alisa, nu ți-e milă de bunică?
— De ce?
— A primit niște străini care făceau sex lângă urechea ei.
— Și la voi n-a fost așa ceva?
— Ba da, dar nu cu bunici. Gândește-te cât de înțeleaptă e femeia asta. A auzit toată noaptea și n-a spus nimic, nici atunci, nici a doua zi. Deși femeile de la țară sunt foarte morale. Putea să îi dea afară.
— În Moldova nu se dau oaspeții afară. Oamenii iubesc și respectă musafirii.
— Frumos popor, moldovenii. Și eu am fost cândva la țară — apă nu vedeam, mâncam și beam vin zile întregi. Tradițiile Moldovei ar trebui invidiate de toată lumea.

Ajunși în Chișinău, primul lucru a fost s-o ducem pe Liza acasă. Am condus-o până la ușă. Am sărutat-o și i-am mulțumit că a fost cu mine. Nu voia să-mi dea drumul, mă ținea de gât, dar totuși trebuia să ne despărțim.

Intrând în casă, am deschis robinetul și am băut apă. Nici nu credeam că poți să te bucuri așa de apă. Cu gura la robinet, a sunat telefonul. Era Liza.

— Da, iubirea mea!
— Iepurașule, vin la tine.
— Ce s-a întâmplat?
— Mama m-a dat afară din casă.
Mama Lizei mă văzuse de câteva ori pe geam. Era mai mult plecată în Italia și revenise recent. Nu ne cunoșteam personal.
— Vino, sigur.
După vreo douăzeci de minute am întâlnit-o pe Liza plângând.
— Ce s-a întâmplat, iubire?
— Nu i-am spus că plec cu tine la țară.
— De ce?
— Nu m-ar fi lăsat. Și voiam atât de mult să fiu cu tine. Nu pot fără tine.
— Așa nu se face. De ce nu te-a sunat?
— Am închis telefonul.
Și a venit momentul în care trebuia s-o iau să locuiască la mine. Eu stăteam cu bunica și tata. Liza a intrat în casă ca o rază de soare. Bunica a îmbrățișat-o imediat.
— Tu ești Liza?
— Da.
— Ești foarte frumoasă. Cum de ți-a plăcut Maxim?
— Și el e cel mai frumos.
A apărut și tata.
— Eu sunt Ghena. Intri la masă? Apă vrei? Am înțeles că la țară era problemă.
— Doar pentru cei care nu pot bea mult vin. Eu pot.
— Bună noră ai adus, Maxim.
Tata e om de aur, glumeț, iubea să gătească.
Stând la masă, un număr necunoscut m-a sunat.
— Alo!
— Maxim? Sunt colonel de poliție. Vă sun în legătură cu Liza.
Am ieșit pe balcon.
— Ce s-a întâmplat?
— Ascultă-mă, jigodie. Ai o jumătate de oră s-o aduci acasă. Altfel vin cu mascații și te bag ani grei pentru răpire.
— N-o țin ostatică. Mama ei a dat-o afară.
— Nu mă interesează. O duci acum.
— O întreb pe Liza. Amenințările păstrați-le pentru alții. Mi se rupe-n pulă.

Am închis. Liza era în spatele meu.
— Hai să facem cum a spus.
— De ce?
— E ruda noastră. Mama știe tot despre tine.
Am decis să mergem împreună la mama ei. Am luat flori. Nu-mi plac conflictele.
Ne-am dus. Am sunat. Mi-era frică al dracului. A deschis o femeie zâmbitoare.
— Eu sunt mama Odri. Intrați.
La masă erau toți. Eu primeam pizde morale pentru cele patru zile lipsă. Răspundeam la întrebări despre muncă, planuri, viitor.
— Știi că Liza trebuia să plece și nu v-ați fi întâlnit?
— Mamă, nu începe!
— Fostul ei, fotbalist…
— Mamă, gata! Maxim, hai afară, că aici începe o mizerie.

Am mulțumit pentru masă și am ieșit. Afară Liza mi-a cerut o țigară desi nu fuma.

— Te-a afectat?
— Da. De ce trebuia să spună asta?
— Nu-mi pasă de foștii tăi. Mă doare-n pulă. De ce fumezi?
— Pentru că m-ai lăsat.
— Doar tu poți face asta. Să fac ice vrei si să ma faci vinovat. 
— Dar o fac cu drag.
— Eu plec. Nu te certa cu ea. Sună-mă dacă e ceva.
— Bine. Și grăbește-te acasă.

Am trecut testul. Chiar dacă mama ei spunea că sunt băiat bun, simțeam că nu m-a plăcut.

— Mamele… teste pe care puțini le trec.
— Maxim, cu caracterul vostru e previzibil.
— Ce e greșit?
— Sunteți prea direct.
— De ce să ascund? Lumea e plină de minciuni.
— Uneori trebuie să taci.
— Dacă tac la început, voi tăcea mereu. Nu sunt masochist.
— De acord.

        `
    },
    {
        id: 'ch4',
        title: 'Accepți?',
        content: `
— Sunt atât de drăguți, Alisa, dar mi se pare că n-o să le iasă.
— De ce credeți asta, Maxim?
— De multe ori, când e prea bine, se termină prost. Se iubeau prea tare. Iar o iubire prea puternică e fie o iubire bolnavă, fie o raritate uriașă.
— Vă propun să vă citesc mai departe din carte, ca să înțelegeți și să trageți singur concluzia dacă e o iubire bolnavă sau una rară.

  Eu și Liza am fost împreună puțin peste trei luni. Tot timpul ăsta nu ne puteam sătura unul de altul. Ea venea mereu la mine la muncă și mă aștepta până închideam localul. Făceam sex peste tot și ori de câte ori aveam ocazia: în lift, în scară, în parc, chiar și în toaletele localurilor. Ea, ca și mine, iubea sexul, și ne-am găsit unul pe altul din punctul ăsta de vedere. Odată cu începutul verii mergeam des la piscină să ne relaxăm și acolo făceam sex. Ni se părea că nu ne vede nimeni. 
  La una dintre ieșirile la piscină a venit la mine un prieten de-al meu, care era directorul de acolo.
— Max! Facem primul reality-show online din Moldova. Aș vrea să vii la casting. Ești o persoană cunoscută în țară și vreau să te cunoască și mai multă lume.
— Ce? Ce reality? Unde îs eu și unde îs camerele? Mie mi-e rușine și să mă pozez.
— Ascultă-mă. Vreau să nu te gândești la camere. Formatul e așa: toată săptămâna filmăm cum trăiți și vă relaxați la piscină. În timpul șederii primiți sarcini pe care trebuie să le îndepliniți sâmbăta pe scenă. După fiecare prestație, juriul vă dă puncte. Cine adună cele mai multe puncte la final câștigă. Premiul — o vacanță pentru doi în Turcia.
— Nu știu ce să-ți spun. Sunt cu Liza și nu-mi trebuie nimeni. Nu vreau publicitate și popularitate. Mie îmi e bine cu ea, ea e sensul vieții mele, nu show-uri și distracție pe cameră.
— Hai, încearcă! Ce-ai de pierdut? Sunt sigură că vei câștiga și mergem în Turcia, — a spus Liza, ținându-mă de mână și privindu-mă cu scântei în ochi.
— Ești sigură că vrei să merg acolo?
— Da! Vreau să participi.
— Bine! Unde e castingul?

  Am intrat la casting, unde mi-au pus întrebări formale. Se uitau mai mult la cât de deschis eram. Eram sigur că voi trece și nici nu aveam emoții. După o oră ne-au anunțat cine merge mai departe și eram și eu pe listă. După asta l-am întrebat pe prietenul meu:
— Ce fel de sarcini o să fie?
— Trebuie să dansați, să cântați, să surprindeți. Nimic complicat.
— Vreau să-ți spun ceva. Din moment ce am acceptat, văd asta ca pe o șansă să-i fac Lizăi cerere în căsătorie pe scenă. O iubesc și vreau foarte mult să fac asta.
— Max! Nici să nu-ți treacă prin cap. Îți explic de ce. În primul rând, vrei să intri direct cu atuul suprem. În al doilea rând, înțelegi că o să îndepărtezi publicul feminin? Pe lângă votul juriului va fi și vot online. Suma voturilor va decide câștigătorul.
— Mă doare-n cur de publicul ăsta. Vreau să fac asta imediat, ca să le fie clar fetelor că am pe cineva, iar Liza să fie liniștită.
— Fă cererea puțin mai târziu. Nu te grăbi.

  Trebuie să recunosc că știa să conducă lucrurile și să convingă oamenii. Am fost de acord să fac cererea mai târziu. Primele două săptămâni îndeplineam sarcinile: fă asta, du-te acolo, stai așa. Sincer, era o prostie, dar când am ajuns pe internet și oamenii au început să ne recunoască, a început să ne placă. Înainte de a treia săptămână, stând în pat cu Liza, am decis s-o întreb:
— Liza! Dacă îți fac cerere, accepți?
— Bineînțeles. Dar de ce?
— Nimic. Doar eram curios.

  Trebuia s-o întreb, pentru că nu voiam să stau pe scenă ca un idiot. Nu-mi păsa cum afecta show-ul, dar să par prost nu voiam. Răspunsul ei a decis că sâmbătă îi voi face cererea. Am sunat prietenii comuni și i-am invitat la show-ul de sâmbătă. Nu știau nimic despre intenția mea, le-am spus doar că voi avea o prestație tare și vreau să-i adun pe toți la aceeași masă.
  A doua zi m-am dus să cumpăr inelul. Nu știam ce inel se oferă, era prima dată, și speram ca vânzătorii să mă ajute.
— Bună ziua. Vreau să cumpăr un inel, pentru că urmează să fac o cerere în căsătorie.
— Aveți nevoie de un inel de logodnă.
— Ce-i ăla inel de logodnă?
— E un inel simplu cu piatră, dar, din păcate, nu mai avem. Avem doar din argint, iar dumneavoastră aveți nevoie de aur.

— Hahaha. Țin minte că și eu abia când am cumpărat inelul pentru cerere am aflat că se numește inel de logodnă.

  Eram în șoc! Într-un magazin atât de mare nu erau inele din aur? Am ales un inel frumos, care sigur avea să-i placă, și o cutiuță elegantă, ca pe scenă toți să rămână cu gura căscată. Nici nu vă puteți imagina ce simți când ieși din magazin cu un inel pentru cerere în căsătorie. Fetelor li se pare că tipul pur și simplu l-a cumpărat, dar de fapt e o alegere grea. Alegem ceea ce credem că o să vă placă vouă. În capul bărbatului e haos total: trebuie — nu trebuie, mă grăbesc – nu mă grăbesc? Dacă nu acceptă?

Mergi spre casă și te gândești unde să-l ascunzi. În general, vrei doar să i-l dai mai repede și să scapi de momentul ăsta.
  În ziua prestației eram ca pe ace. Aveam impresia că o să leșin de emoții. M-am apropiat de masa unde stăteau prietenii și Liza și l-am rugat pe unul dintre ei să vină cu mine puțin deoparte.
— Roma, vreau să-ți spun ceva, dar să nu țipi ca un tăiat. Azi îi fac Lizăi cerere pe scenă.
Ochii lui Roma au ieșit din orbite.
— Ești dus? Max, chiar vrei să faci cererea?
— Da! De ce să mai trag de timp?
— Wow! Frate, Max, ce trebuie?
— În primul rând, nu țipa, idiotule. În al doilea rând, o ajuți pe Liza să urce pe scenă când o chem.
— Maxim, nici nu se discută. Sunt atât de fericit pentru voi. Nu-mi vine să cred.

  Am plecat în spatele scenei, fără să uit să o sărut pe Liza cu pasiune. Îi plăcea când o sărutam în fața tuturor. În spatele scenei aveam impresia că o să mă fac de râs în fața întregii țări. Mi se făcea greață de emoții. După prestația mea, prezentatorul anunță că îi așteaptă o surpriză pe toți și că vreau să spun ceva.
  Apropiindu-mă de microfon, simțeam că picioarele sunt din vată. Când l-am luat în mână, pentru o clipă am uitat toate cuvintele. Dar, inspirând adânc, am început:
— Dragi prieteni! Dragi oaspeți! Ceea ce voi face acum nu are nicio legătură cu show-ul. Nu vreau să influențeze notele voastre. Sper că va fi prima și ultima dată, pentru că e foarte greu. În sală se află iubita mea. Liza! Soarele meu, urcă pe scenă.
După ce am urcat-o pe scenă și am sărutat-o, am continuat:
— Uitați-vă la ea, cât e de mică! Dar are totul. E prietena mea, doctorul meu, bucătarul meu, iubita mea. E mică, dar atât de bună. Și acum vreau să te întreb, iepuraș: vrei să fii soția mea?
  M-am pus în genunchi, am scos cutia, am deschis-o și i-am întins inelul. Ea mi-a întins mâna și câteva secunde n-am reușit să-l pun, pentru că am uitat pe ce deget și pe ce mână se pune. După ce i l-am pus, a luat microfonul și a spus:
— Sunt în șoc! Și eu iubesc acest om.
— Atunci care e răspunsul? — am strigat fără microfon.
— Bineînțeles că spun DA!

M-am ridicat și am sărutat-o cu o pasiune cum n-o mai făcusem niciodată. Ea e logodnica mea. Credeam că o să plâng de fericire. Toți participanții și prietenii au început să ne îmbrățișeze. Stăteam pe scenă ca niște superstaruri. Toată seara am primit felicitări. Mult timp după show ne-am luat rămas-bun înainte să ne urcăm în mașină și să plecăm.

Stând pe bancheta din spate, Liza a decis să-și sune mama.
— Mamă! Maxim mi-a făcut cerere! — a strigat ea plină de bucurie.
— Felicitări. Și tu i-ai spus?

În momentul ăsta am cam înlemnit.
— Nu încă. Dar acum o să-i spun.

După ce a închis, mă uitam la ea nedumerit.
— Iubire, ce ar trebui să-mi spui?
— Înțelegi… nu te stresa, o să-ți explic tot acum. Problema e că eu sunt puțin din altă religie.
— Puțin — adică cât?
— Sunt adventistă de ziua a șasea. Sau, cum spun toți, „sâmbătari”.
— Și ce?
— Pot să mă mărit doar cu un băiat din religia noastră. Iar problema e că bunicul meu e pastorul bisericii. Nu m-ar ierta.
— Și ce facem? Cum rezolvăm asta? Eu nu pot ieși din religie. Tu ești botezată acolo?
— Nu. Dar pentru că bunicul meu e acolo, automat sunt în credința asta. Și noi nu facem nuntă. Nu bem alcool, nu dansăm, nu mergem în cluburi și nu înjurăm.
— Dar tu ai făcut toate astea cu mine lunile astea.
— Da! Am păcătuit, dar pentru tine.
— Sunt sigur că vom rezolva. Azi să ne bucurăm că suntem mai aproape să fim soț și soție.

  Am mers spre casă îmbrățișați și în tăcere. Înțelegeam că îi e greu pentru că nu mi-a spus de la început și că eu sunt în șoc. Dar știam și că putem trece peste orice.

  După câteva zile, a venit momentul când părinții noștri trebuiau să se întâlnească la Liza acasă. Din partea ei erau doar mama și bunica. Tatăl ei era în Franța. Din partea mea erau mama, tata și tatăl vitreg. Întâlnirea a fost caldă, până când a venit vorba despre religie.
  Tatăl meu a spus direct că la nunta unicului său fiu nu poate să nu bea și să nu danseze. Mama Lizei a spus că la o asemenea nuntă nimeni din familia lor nu va veni, pentru că religia nu le permite. S-a ajuns la concluzia că e nevoie de timp să se gândească toți. Nimeni nu voia să se grăbească și fiecare își dorea ce e mai bun pentru copilul lui.
  Multe săptămâni am tot discutat asta. Am mers chiar la bunicul ei. El a spus că ar fi o rușine pentru biserică și că nu poate să-și dea nepoata după un băiat din altă religie. După asta ne-a fost și mai greu și am decis să continuăm să trăim și să vedem ce facem. Trebuie să existe o soluție. Nu poate fi imposibil.

— Alisa, nu e corect. Cum o astfel de pereche nu poate fi împreună din cauza religiei? Chiar nimeni nu poate face un compromis?
— Fiecare crede în felul lui. Unii merg la biserică, alții își amintesc de Dumnezeu doar când le e greu, alții nu cred deloc. Dar aici sunt doi oameni care se iubesc și sunt la fel de fideli credinței ca și relației lor. Pentru căsătorie nu e o problemă. E o problemă pentru cununie. Pentru mulți nu contează certificatul și ștampila din pașaport. Contează căsătoria din cer, confirmată de Dumnezeu. Asta e cauza pentru care Maxim și Liza suferă atât.
— Credința trebuie să fie în inimă și în cap. Dar nu ar trebui să împiedice căsătoria. Sunt o grămadă de oameni care se iubesc enorm, dar nu se pot căsători din cauza credinței. Asta e o barieră de rezolvat în familie. Dacă familia te acceptă așa cum ești, de ce să nu trăiești fără cununie? Sau trăiți toată viața împreună fără căsătorie. Dar în lume iubirea ar trebui să fie mai presus de orice.
— Nu sunt de acord, Maxim. Credința e o parte inseparabilă a oamenilor. Și pentru credință unii pot renunța chiar și la iubire. Dar fiecare caz e diferit.
— Alisa, ești un robot care citește tot de pe internet. Tu nu poți ști ce e iubirea și credința.
— Aveți dreptate, Maxim. Sunt doar un program care citește informații de pe internet. Dar înainte să vi le transmit, analizez milioane de fișiere și vă dau un răspuns clar, formulat de oameni inteligenți.
        `
    },
    {
        id: 'ch5',
        title: 'Tornado',
        content: `
Ce relații ați avut voi? Da, da, voi, dragii mei cititori. Probabil totul a fost lin, fără certuri, fără supărări, nu? Sau, ca la toată lumea din lumea asta? Noi cu Liza nu am fost o excepție. În ciuda faptului că ne iubeam atât de tare încât puteam aprinde focul doar privindu-ne, în relația noastră au existat și momente de ceartă. La începutul oricărei relații totul e frumos și neted. Dar după perioada de acomodare și cunoaștere încep certurile din nimic. Și asta se explică printr-un singur lucru - oamenii încep să se plictisească de partenerul lor. Nu mai pot, ca înainte, să stea în aceeași încăpere. Și pentru asta au nevoie de o scânteie ca sentimentele să se reaprindă. Iar cea mai potrivită metodă este cearta. Cât de neplăcut e momentul certării și cât de plăcut e momentul împăcării? Hai, recunoașteți, știți sentimentul ăsta. Când băiatul cumpără flori. Când sărutul de după ceartă e mult mai dulce și mai pasional. Când sexul e ca la primele întâlniri. Certurile sunt un stimul pentru relație. Iar Liza știa cum să țină relația în priză.

  Discutam des cu ea că ar trebui să ne certăm mai puțin din nimic, pentru că asta nu duce la nimic bun și sigur nu ne ajută. Stăteam des pe acoperișul unui garaj abandonat din curte, beam cafea și priveam orașul care de acolo se vedea ca în palmă. Ne uitam pur și simplu în depărtare, la Chișinăul de noapte, vorbeam despre toate temele vieții și ne sărutam la fiecare glumă stupidă a Lizei.

— Iubita mea, cum crezi, cât costă cafeaua asta?
— Cincisprezece lei.
— Nu. M-a costat ani de mesaje cu tine. Milioane de cuvinte alese și scrise ca să ieși cu mine la o cafea. M-a costat nervi, griji și răbdare. Pentru cafeaua asta am plătit cu imaginația pe care am pornit-o ca să te invit. Cafeaua asta costă emoții uriașe. Stau lângă cea mai frumoasă fată din lume. Pentru mine, cafeaua asta e neprețuită.
— Pentru mine nu doar cafeaua asta e neprețuită, ci tot ce e legat de tine. Ești omul lângă care mă simt liniștită și sigură. Și asta e o raritate în zilele noastre. De obicei, fetele nu văd stabilitate în partenerul lor. În tine, stabilitatea asta e din plin. Și nu vorbesc de bani, ci de dragostea ta constantă pentru mine.

Discuțiile astea erau peste tot și mereu. Nu ne săturam unul de altul. De cum deschideam ochii, ne gândeam unul la altul și așa până adormeam. Se spune că dacă te gândești mult la ceva, îți apare și în vis. Pe mine Liza mă visa mereu sau îmi povestea visele ei cu mine. Dar, bineînțeles, chiar și în relațiile astea frumoase au existat certuri.

Îmi amintesc prima noastră ceartă serioasă, în Turcia. După cum ați înțeles deja, câștigasem proiectul și am zburat în vacanță. Imaginați-vă ce simt doi tineri îndrăgostiți când pleacă în prima vacanță împreună. Pentru Liza era chiar primul zbor cu avionul. Cu ochii ei mari și mirați s-a apropiat de avion și m-a întrebat:

— Și cum dracu’ zboară monstru’ ăsta?
— Zboară ca o păsărică.
— Ești sigur?
— Nu sunt sigur. Dar trebuie să verificăm.
— Vorbele tale m-au “liniștit” maxim, Maxim. Mersi.

Ajungem în Turcia și primele trei zile sunt perfecte. Liza avea fotograf personal, pe mine, care nu trebuia să se odihnească, ci să fotografieze. Asta e misiunea bărbaților în vacanță - să meargă și să pozeze toate momentele, în costume de baie diferite și în locuri diferite. Liza a văzut pentru prima dată ce înseamnă all inclusive și era din categoria celor care la micul dejun își umpleau cinci farfurii mari și repeta mereu: „Trebuie să gustăm asta, Maxim”. În a patra zi, Liza a aflat că hotelul are discotecă și a vrut acolo. Dar mie, ca om din industria de noapte, nu-mi păsa deloc. M-a rugat mult, dar eu nimic. Într-un final:

— Mă duc singură.
— Nu te duci nicăieri.
— Mă duc.
— Liza, vrei să ne certăm din cauza unui club?
— Maxim, tu lucrezi în cluburi și te-ai săturat. Eu vreau distracție. Sunt tânără și vreau să dansez. Vreau cu tine, dar tu vrei să stai în cameră ca un moș.
— Dacă te duci singură, o să avem o ceartă foarte serioasă. Nu te las.

Credeți că a oprit-o? Evident că nu. Demonstrativ, a început să-și aleagă hainele ca să aibă cât mai multă atenție în club. Și-a pus lenjerie frumoasă, și-a tras încet și sexy ciorapii, apoi cea mai scurtă fustă, astfel încât ciorapii să se vadă, și a început să se machieze. Toate astea în fața oglinzii, știind că eu stau pe pat și văd tot.

— Uite-o ce scorpie. Dar îmi place.
— De ce, Maxim?
— Pentru că știe că el se uită. Știe că fierbe pe dinăuntru. Și totuși îl provoacă.
— Inexplicabil. Femeile nici ele nu-și pot explica multe gesturi. Le fac chiar dacă știu că vor duce la certuri și lacrimi.
— De ce? De ce nu pot trăi liniștite?
— Dacă femeile nu-și pot explica comportamentul, eu, gadget, sigur nu pot. Nici pe internet nu există răspuns.
— Of, femeile astea… Continuă, Alice.

Liza mi-a aruncat o ultimă privire și a ieșit fără să spună nimic. Eu fierbeam. Eram la limită. După o oră m-am calmat și am adormit. Liza a venit la 7 dimineața. M-a sărutat adormit.

— Trezirea, puiule, vino cu mine.
— Glumești? Unde ai fost până la 7?
— În club. Hai să mâncăm, mi-e foame rău.
— Foame, curvo? Pe unde ai umblat? Ți-am zis să nu te duci. Ce pula mea ai căutat acolo?
— Nu urla la mine, psihopatule. Ți-am zis să vii cu mine, tu ai făcut pe încăpățânatul. Trebuia să stau în cameră? Sunt în vacanță la hotel, nu la sanatoriu. Vreau emoții, nu să stau la piscină și-n cameră.
— Acum mă acuzi pe mine?
— Da, stai ca un moș în timp ce toți se distrează.
— Atunci du-te cu ei. Ce cauți cu mine? Îți iau cameră separată.
— Maxim, nu mă enerva. Hai să mâncăm.
— Du-te singură.
— Mă duc. Găsesc eu cu cine să stau la masă.

Atunci am cedat. Am aruncat în ea cu un parfum. A evitat, și parfumul a spart oglinda.

— Ești nebun? Dacă mă nimereai în cap?
— Eu sunt nebun? Du-te dracu’ afară din cameră.
— Te-ai nenorocit.

A sărit pe mine, m-a bătut și zgâriat, m-a mușcat până la sânge. Am imobilizat-o. A rămas fără puteri.

— Dă-mi drumul.
— Te-ai calmat?
— Da.

I-am dat drumul. Respira greu și a început nervos să se aranjeze.

— Ridică-te. Mergem să mâncăm, dracu’, și nu mă enerva.

Am mers după ea, tăcut. Era agresivă. Mă speria forța ei.

  Restaurantul era deschis. Ne-au dus pe plajă. Masă cu față albă, petale de trandafiri în formă de inimă.

— Aici am fost, Maxim. Toată noaptea am pregătit surpriza. Am mers după petale, după vinul tău preferat. Cu bucătarul-șef. Aici am fost. Crezi că sunt o proastă? Am ieșit și mi-am dat seama că nu-mi trebuie niciun club. Am nevoie de tine, idiotule. Tu ce-ai făcut? Ai aruncat cu parfum? Mulțumesc.

Am tăcut. Am cerut iertare. Am îmbrățișat-o.

— Te iubesc.
— Du-te-n pizda mă-tii, Maxim.
— Te iubesc.
— Și eu. Dar azi m-ai scos din sărite. Dimineața bună ție, Maxim. 
  După ce a băut un pahar plin de vin, Liza s-a apucat de micul dejun. Eu mâncam în tăcere lângă ea și analizam cuvintele ei. Într-adevăr, viața mea și munca mea nu erau pentru relații și familie. Era o muncă mai degrabă pentru cei care vor să-și trăiască tinerețea fără griji. Iar ea suporta toate astea de fiecare dată când ieșeam la tură.

— Nu există muncă proastă. Dar, sincer, sunt șocat de cât de înțeleaptă e Liza. E exact ca fosta mea. Și ea făcea la fel. Parcă îmi povestești viața, Alice.
— Din păcate, nu e viața ta. E o poveste cu multe coincidențe. Relațiile sunt aproape la fel la toți.
— Dar cum se poate ca pe mine să mă cheme Maxim și pe el Maxim? Fosta mea se numea Liza și și ea e Liza.
— Maxim și Liza sunt nume internaționale. Coincidențele apar des în cărți.
— Dar ai observat cum a întors totul? Cum a găsit ocazia să-i facă surpriza și momentul să-i spună tot? Totul foarte inteligent. Bravo ei. Pentru mine s-a deschis altfel.
— Da, a făcut totul frumos și la momentul potrivit.
— Citește mai departe.

  A doua noastră ceartă n-a întârziat. Tot timpul Liza îmi amintea că trebuie să renunț la muncă și că nu mai poate așa. Nu mai venea la mine la muncă atât de des ca înainte. Dar fiecare vizită însemna scandal acasă. Mă suspecta și mă gelozea pe toată lumea. Dacă cineva se uita altfel la mine sau dacă dădeam cuiva prea multă atenție, însemna că am ceva cu ea. În fiecare dimineață, acasă, îmi scotea asta pe ochi, iar eu trebuia s-o liniștesc și să-i explic că nu are dreptate. Într-un final i-am interzis să mai vină la muncă, ca să nu-mi facă scandal.

  Într-o zi, lucrând, o fată s-a urcat pe bar și a început să danseze. Pentru show m-am urcat și eu și am început să dansez cu ea. Încet, s-a pus în genunchi, mângâindu-și lent pieptul, și și-a ridicat tricoul, dezgolindu-și sânii. Sala urla, toți erau în extaz. Dar nu s-a oprit aici. Mi-a luat mâna și mi-a pus-o pe pieptul ei. Sub fluierături și strigăte, îi strângeam sânii cu mâna mea. Toți se distrau, urlau de ce vedeau. Am ridicat capul și m-am uitat la fețele fericite. Și atunci am văzut-o pe Liza în mulțime. Stătea și se uita la mine. Zâmbetul mi-a dispărut imediat și mi-am tras mâna. Pe buzele ei am citit: „du-te naibii”. S-a întors și a ieșit rapid. Am sărit barul și am alergat după ea. Afară am prins-o de mână.

— Ce faci aici?
— Du-te naibii!
— Iubire, ce faci aici? Lasă-mă să-ți explic.
— Du-te naibii!
— Nu e ce crezi. A fost pentru show. Nici eu nu mă așteptam să-mi pună mâna pe piept.
— Nu e ce cred? Maxim, intru și te văd cum ții o târfă de țâțe. Ce trebuia să cred? Că e mamă care alăptează și trebuia mulsă? Și Maxim erou? Ce dracu’ n-am înțeles? Ieși din viața mea. Stai cu curvele. Ți-am spus că munca ta o să mă facă să te las. Ziua asta a venit. Ne despărțim. Mersi pentru tot și du-te dracu’.

  Și-a smuls mâna, s-a urcat într-un taxi și a plecat. Gata. Am pierdut-o. Doar asta aveam în cap. Am pierdut-o pe cea fără de care nu pot trăi. Totul din cauza mea. Am stat pe bordură și am aprins o țigară. Ce să fac acum? Cum s-o aduc înapoi? Am sunat-o, mi-a închis. Mesajele le ignora. Trei zile am stat acasă. Seara m-am dus la mama, căci mă invitase la cină.

— Unde e Liza? m-a întrebat mama.
— Ne-am despărțit.
— Cum? De ce?
— Nu vreau să vorbesc. E vina mea.

Eram distrus. Am băut două pahare de șampanie. Dintr-odată m-au mâncat îngrozitor mâinile, s-au înroșit.

— Ce ai, Maxim?
— Nu știu. Probabil iar alergie la alcool.
— Nu pare alergie.
— Mă mănâncă rău.
— Ne îmbrăcăm și mergem urgent la spital.

Pe drum mi-au cedat picioarele, mi s-a întunecat vederea. Ultimul lucru pe care am văzut e inscripția - reanimare. M-am trezit a doua zi. Diagnostic: cădere nervoasă, stare preinfarct.

— Liza știe? O întreb pe mama
— Știe. E pe hol. Acuși o invit. 

A intrat. M-a îmbrățișat.

— Idiotule. Ce ai făcut?
— Iartă-mă.
— Te omor eu.
— Îmi pare rău. Vreau să ne împăcăm. Mă las de muncă.
— Serios?
— Foarte serios. Nu pot fără tine.
— Vorbim după spital. Acum fii calm.
— Te iubesc.
— Prostule…

  După externare, mi-am ținut cuvântul și mi-am dat demisia. Au fost discuții lungi cu colegii și cu directorul, toți îmi spuneau că nu trebuie să fac asta. Dar îi promisesem Lizei și nu puteam s-o pierd încă o dată. Era fericită că am ales-o pe ea. Primele două luni aveam bani strânși și îmi permiteam să stau acasă. Dar banii se terminau rapid, iar eu tot nu găseam de lucru. Atunci au început certurile din cauza faptului că Liza voia să meargă la cafenele prin oraș, iar eu n-aveam bani de o apă. Eram nevoit să refuz, ea se supăra și îmi cerea să-mi găsesc un job decent.
  Nu vă gândiți că stătea pe gâtul meu. În perioada în care eu eram fără muncă, Liza a mers la cursuri de extensii de gene, plătite de mine. Apoi i-am cumpărat tot ce-i trebuia pentru lucru și a început să primească fete acasă. Comenzi erau puține, dar de fiecare dată când primea bani, mă lua și mă scotea în oraș.

— Acum e rândul meu să te scot și să plătesc eu.
— Mi-e rușine când plătești tu.
— Mie îmi place să-mi scot iubitul în oraș. Îmi place că sunt cu tine și când e bine, și când e greu. Alta te-ar fi lăsat când s-au terminat banii. Eu sunt cu tine. Tu ai renunțat la muncă pentru mine. Dacă nu eram eu, făceai milioane. Așa că apreciez gestul tău. Ne va fi greu? Da! Dar trecem împreună.

— Bravo. De fiecare dată mi se deschide tot mai mult, Alice.

  Au trecut șase luni de când îmi dădusem demisia. Presiunea părinților creștea — trebuia să mă angajez. Ne mai ajutau, dar nu putea dura la nesfârșit. Liza îmi făcea scandal din nimic. Nu înțelegeam ce se întâmplă. Parcă lumea întreagă se întorsese împotriva mea. „Celebrul” Maxim nu mai era bun de nimic. La joburi normale nu mă voiau pentru că toți mă știau drept Maxim barmanul. Prietenii îmi spuneau că ei cu mine beau, nu muncesc. A început depresia. Relația noastră se ducea dracu’. Sexul era o dată pe săptămână și atât de leșinat și trist încât mai bine nu-l făceam. Din frustrarea Lizei, scandalurile erau zilnice. Atunci m-am gândit să mă mut la bunica, să stau singur cu gândurile mele. Liza n-a fost împotrivă. Era obosită și ea.
  După o săptămână la bunica, într-o dimineață am decis că ajunge să stau posomorât. Mi-am pus muzică și m-am apucat să caut de lucru. Am deschis calculatorul și am intrat pe VK. S-a deschis pagina Lizei. Mi-am amintit că fusese la mine și ascultasem playlistul ei. Gust bun avea la muzică. Dar ca și orice băiat eram curios ce se mai face la ea prin mesaje. Și am dat peste o conversație cu un tip. De două luni apoximativ comunicau. Am dat scroll și am văzut poze intime în conversație. Ea îi trimitea pizda, el pula. Tipul era din New York, fotograf după profesie. Îl mințea că nu are pe nimeni. Am citit tot. Am printat tot și m-am dus la ea. Am sunat la ușă și a deschis Liza uimită.

— De ce n-ai spus că vii?
— Eram prin zonă.
— Ce hârtii ai în mînă?
— Cheam-o pe mama ta. Și vino și tu sâ vă explic ce hârtii am. 

Au stat amândouă pe canapea încremenite și nedumerite. 

— S-a întâmplat ceva?
— Da. Fiica dumneavoastră mă înșală. Uite pula viitorului ginere. Și aici e pizda fiicei dumneavoastră. Aici zice că n-are pe nimeni. Asta e cauza scandalurilor. Nu pentru că Maxim e de căcat. Ci pentru că Liza are pe altul, la New York. Mult noroc si success vouă în toate. 
  Am plecat. Asta a fost. Nu pot ierta așa ceva. O săptămână m-a sunat și mi-a scris. N-am răspuns. M-am mutat la mama. Știam că îi va fi rușine să apară acolo.
  Într-o zi, la masă, sună telefonul mamei. Fața i s-a schimbat.

— Unde ești? Întreabă mama pe cineva pe telefon. 
— Ce s-a întâmplat? Am întrebat eu în dată. 
 Mama se uitase la mine și după ce a închis telefonul îmi spune:
— Liza e pe pod. Spune că sare dacă nu vii.

Am fugit urgent spre pod. Era chiar lângă casa noastră. Ea stătea  dincolo de parapet.

— Ce faci?
— Sar dacă nu vorbim.
— Treci înapoi și vorbim.
— Ne împăcăm?
— Da, dracu’, da!

A trecut încet. M-a îmbrățișat strâns și prin lacrim tot îmi spunea: 

— Iartă-mă. A fost doar vorbă. A fost ca o gură de aer. Tu erai deprimat. M-am plictisit dar nu pot fără tine.
— Ai mâncat?
— Nu.
— Hai să mâncăm. Mâncarea mamei se răcește.

Ne-am sărutat pe pod, plângând. Am mers la mama și am cerut liniște.

— Înțelepciunea nu e pentru toți. Nu e în cărți, e în a ierta. Poate va repeta. Dar el a ales dragostea. Când iubești, mândria se bagă undeva.
        `
    },
    {
        id: 'ch6',
        title: 'Începutul sfârșitului',
        content: `
Au trecut deja trei ani din momentul în care am început să ne întâlnim cu Liza. Certurile și împăcările nu se mai terminau. Dar, cu toate astea, nu puteam unul fără celălalt. Și exact atunci când am crezut că mai rău de-atât nu se poate, s-a întâmplat ceva la care nu mă așteptam.

Vreau să uit ziua aceea în care a început totul. Să uit acel telefon de la sora mea, care mi-a spus, într-un ton aproape glumeț, că bunica a căzut.
— Ce s-a întâmplat cu ea?
— S-a împiedicat de covor și a căzut.
— Și acum ce e cu ea?
— Spune că o doare piciorul. Stă în bucătărie și se plânge că o doare chiar și când stă jos.
— Și voi ce faceți? De ce nu chemați ambulanța?
— Maxim, la ce ambulanță? A căzut și atât. Stăteam în bucătărie și, deodată, am auzit că a căzut. Ne-am uitat și era întinsă pe jos. La început am râs, apoi ne-am dat seama că nu se poate ridica și am așezat-o pe scaun.
— Vin imediat. O aud cum geme, iar voi stați și râdeți? Sunteți normali la cap?

  După ce i-am spus Lizei că bunica a căzut, am plecat spre casă. Când am intrat în apartament, am văzut-o pe bunica stând în bucătărie și gemând de durere. Stătea într-o parte, pentru că pe cealaltă nu putea să se așeze deloc. Iar la masă stăteau tata, sora mea și cumnatul, beau bere și ascultau muzică.
— Ați înnebunit, mă? — am început să urlu când am văzut scena. — Ea stă aici și geme de câteva ore, iar voi beți? Sunteți, în pula mea, complet fără creier?
— Maxim, calmează-te, — mi-a spus sora mea, oprind muzica de pe telefon.
— Bunico, unde te doare?
— Toată partea dreaptă.
— Ai căzut tare?
— Nu foarte tare, dar simt că ceva nu e în regulă.
— Poți să îndoi degetele de la picioare?
— Nu pot face nimic. Piciorul pur și simplu nu mă ascultă.
— Chem acum ambulanța și mergem să vedem ce e.

Aruncând o privire plină de furie spre toți cei din bucătărie, am început să sun la ambulanță. După ce au examinat-o pe bunica, medicii au spus că trebuie dusă la radiografie. Aveau suspiciuni de fractură și trebuia verificat. Au adus în apartament un scaun special pentru transport și atunci am văzut cât de tare o durea să se ridice și să se așeze. Se strâmba de durere când o mutau de pe scaun pe fotoliu. În acel moment, toți din apartament au înțeles că situația e gravă și că au greșit ignorând-o. Eu și tata am mers cu ea la spital. După radiografie, a ieșit medicul și ne-a spus vești deloc bune.
— Maxim, bunica ta are fractură de col femural.
— Și ce înseamnă asta? O spuneți de parcă i-ar mai rămâne câteva zile de trăit.
— Are nevoie de operație. Problema e că nu o putem face, pentru că există un risc mare să moară pe masa de operație. E bătrână, iar inima ei poate să nu reziste anesteziei. În plus, are diabet zaharat și nu putem oferi nicio garanție că nici după operație va fi bine sau că va mai merge.
— Și ce propuneți?
— Dacă vă dați acordul, și ea la fel, că nu ne asumăm responsabilitatea în caz de deces, suntem gata să începem operația. Dacă nu, vă explic cum trebuie îngrijită.
— Dacă o îngrijesc eu, care sunt șansele să se ridice și peste cât timp?
— Va trăi atât timp cât veți avea grijă de ea. Nu sunt sigur că se va mai ridica vreodată. Dar există o șansă. Totul depinde de voi. Pentru început, trebuie să cumpărați baloane și să o puneți în fiecare zi să le umfle. Din cauza faptului că va sta mereu întinsă, există riscul să facă pneumonie. Căutați pe internet exerciții de terapie respiratorie. De asemenea, trebuie să faceți gimnastică cu ea. Trebuie să îi lucrați mâinile, spatele și gâtul. Dar cea mai mare problemă sunt escarele. Trebuie să fiți foarte atenți. Faceți-i masajul întregului corp în fiecare zi. Dacă apar escare, e ca o gangrenă care, în timp, trebuie amputată.
— Ce lucruri îmi spuneți? Bineînțeles că o să fac totul și o să rezolvăm. O să vedeți cum venim la voi pe propriile picioare.
— Sper foarte mult, Maxim.
— Dacă am grijă bine de ea, peste cât timp se va ridica?
— Cred că va mai rezista maxim trei luni. Sunt medic cu experiență și, după experiența mea, toți mor repede.
— Dacă sunteți așa de experimentat, ați fi găsit o soluție să o puneți pe picioare. E o fractură, nu o rană la cap. O zi bună.

Am plecat fără să-i strâng mâna, pentru că auzisem ceva ce n-aș fi vrut să aud niciodată. Am luat-o pe bunica și am așezat-o în mașina cumnatului. Ajuns acasă, le-am spus tuturor ce trebuie să facem. Tăcerea era ca într-un sicriu în momentul în care vorbeam. Cu doar câteva ore înainte se distrau în bucătărie, iar acum venisem cu asemenea vești. Bunica a fost așezată într-o cameră. Din ziua aceea a început o muncă infernală, pe care nu o voi uita niciodată. Din prima noapte, bunica ne trezea și ne ruga să o întoarcem ba pe o parte, ba pe cealaltă. Voia să-i punem perna mai sus sau mai jos. Ba îi era sete, ba trebuia la toaletă. După câteva zile, am adus un fotoliu extensibil lângă patul ei, ca să nu mai strige de fiecare dată când avea nevoie de ajutor. Avea nevoie de îngrijire douăzeci și patru de ore din douăzeci și patru. Nu era o bolnavă pretențioasă, dar când asta continuă permanent, nervii încep să cedeze. Făceam de gardă pe rând: eu, tata, sora mea. După o lună, am înțeles că nu mai putem și că avem nevoie de o îngrijitoare. Când stătea sora mea cu ea, bunicii îi era mai confortabil, iar când stăteam eu sau tata, se rușina. Ca orice femeie, trebuia spălată în zona intimă. Iar dacă eram eu sau tata de serviciu, se rușina chiar și să ceară la toaletă. Asta a fost decizia finală să luăm o îngrijitoare femeie, care să ne ajute. O plăteam puțin, pentru că avea nevoie de locuință aproape de muncă. Lucra chiar sub blocul nostru și îi era foarte convenabil. Lori a fost salvarea noastră și, în plus, o bună interlocutoare pentru bunica atunci când se plictisea.

După două luni și jumătate, bunicii nu îi era mai bine. Abia îmi mai strângea mâinile la gimnastică, iar după un nou control al corpului am observat o escară pe călcâi. Am citit pe internet toate sfaturile despre cum să scapi de escare și am trecut la fapte. Nu voiam ca, pe lângă tot ce trăiam, să i se mai taie și piciorul. Cu atât mai mult cu cât asta era imposibil din același motiv ca și operația. Atunci am decis că trebuie să stau cu ea mai mult și să o supraveghez mai bine decât ceilalți. Liza a fost de acord că voi avea grijă de ea și că pentru o vreme vom locui separat.
„Maxim, apă. Maxim, vreau să mănânc. Maxim, întoarce-mă.” Asta auzeam la fiecare zece minute, zi și noapte. Nervii mei erau la limită și asta se reflecta în relația mea cu Liza. Ea voia să mă vadă, iar eu nu puteam. Din cauza nervilor, ne certam mereu. Din orice motiv, îmi ieșeam din fire. Într-o zi, după o altă ceartă, Liza a venit la noi acasă. A intrat ca un uragan și a început imediat să caute prin dulapuri și prin toate camerele.
— Ce faci?
— Unde e curva aia? Nu cred că ești aici doar cu bunica.
— Liza, ești sănătoasă la cap? Ce curvă? Crezi că sunt cu cineva, în timp ce bunicii îi e rău?
— Da! Unde e? Sau când vine? Nu se poate să ne certăm așa, pur și simplu. Ai pe cineva, sută la sută.

Atunci bunica a început să țipe.
— Maxim, ce se întâmplă? Liza, ce ai pățit?
— Maxim, aduci fete aici?
— Liza, ce-i cu tine? Ce fete? El se chinuie aici cu mine.
— Nu vă cred nici pe voi, nici pe el.
— Maxim, te rog, calmeaz-o.
Bunica a început să plângă de frică.

— Liza, calmează-te. Ieși din cameră.
Liza a ieșit și s-a așezat pe un scaun în hol.
— O să stau aici. Dă-mi telefonul tău, să nu suni pe nimeni, și vreau să verific că nu vine nimeni la tine.
— Liza, ești bolnavă? Ia telefonul și stai cât vrei. Dar de ce ai făcut-o pe bunica să plângă? Înțelegi că îi e rău? Eu deja nu mai găsesc nervi să nu izbucnesc la ea, iar tu vii și faci aici astfel de scene.
  M-am aplecat asupra ei, în timp ce stătea pe scaun, și o țineam de umeri. Deodată, m-a lovit cu toată puterea cu genunchiul în coaie. Durerea a fost cumplită, dar am rămas în picioare.
— Mai faci o dată asta și te lovesc.
Atunci Liza m-a lovit a doua oară în coaie.
— Liza, încă o dată și te lovesc, și o să regreți.
  Liza m-a lovit și mai tare cu genunchiul. Atunci Liza a primit de la mine prima și singura palmă. A fost șocată de lovitură. S-a ridicat și a ieșit din apartament la fel de repede cum intrase. Imaginea era jalnică: mă dureau coaiele, palma îmi ardea de la palmă care am dat-o, eram certat cu iubita, iar în cameră plângea bunica.
  
  Câteva zile ne-am scris mesaje cu asemenea insulte, că nici nu știam că știe asemenea cuvinte. Totul ducea spre despărțire. Ea insista că am lovit-o, iar eu că eu sunt bărbatul în casă și că trebuie să mă asculte și să aibă încredere în mine. Cred că așa ceva există în fiecare familie și nu surprinde pe nimeni.

  Din ziua aceea, bunicii i-a fost mai rău. A început să delireze și să spună să-i dau mâna ca să se ridice și să meargă la baie. Eu îi spuneam că de trei luni nu s-a mai ridicat singură la duș, iar ea îmi spunea că atunci când stă Lori cu ea, merge singură să se spele. Atunci am aflat pentru prima dată în viață ce înseamnă delirul unui om. Prima zi ți se pare amuzant, apoi începe să-ți joace pe nervi. Din greșeală i-am spus mamei ce îmi spune bunica, iar ea mi-a spus că asta înseamnă că îi moare creierul și că va muri curând.

După o săptămână de astfel de deliruri, stăteam în bucătărie cu tata, iar sora mea trecea dintr-o cameră pe lângă camera bunicii și, deodată, a țipat:
— Bunico, ce ai?

Am sărit imediat și am văzut că bunicii i se făcea rău și se înecase cu propria vomă. Am venit, am întors-o pe o parte și am început să țip. Am înțeles că murise după ochii dați peste cap.
— Bunicooo. Trezeste-te — repetam fără oprire.

Țipam din toată puterea și o scuturam.

  Dintr-odată, a început să respire și și-a întors privirea spre mine. Am început să o șterg și să vorbesc cu ea:
— Bunico, mă auzi?
— De ce ai făcut asta?
— Ce am făcut? Aproape ai murit.
— Eram deja acolo. Îmi era atât de ușor acolo. Mergeam.
— Unde acolo?
— Acolo de unde m-ai chemat înapoi.

Atunci am înțeles că bunica a trăit moartea și că eu am salvat-o. Atunci credeam că sunt un erou și că am salvat un om. Dar nu a fost așa. I-am spus mamei ce s-a întâmplat și ea a sunat imediat preotul. Nu mai fusese la noi de peste douăzeci de ani, iar acum a venit cu preotul.

După ce preotul a plecat și i-a iertat păcatele, bunicii i s-a făcut imediat rău. Am chemat prima ambulanță, care a venit să o consulte. Erau două fete tinere, iar una dintre ele m-a tras pe coridor și mi-a spus:
— Trebuie să o duceți la spital. Astăzi va muri.
— De ce la spital, dacă va muri?
— Problema e că, dacă moare în spital, procedura de eliberare a documentelor e alta. Iar dacă moare acasă, va trebui să chemați medicul de sector și poliția. Și veți demonstra mult timp, mai întâi că ați făcut totul ca să o salvați, iar apoi că nu voi ați omorât-o.
— Vorbiți serios? Stăm cu ea de trei luni. Și credeți că aș fi omorât-o eu?
— Asta veți explica poliției. Eu vă spun acum, ca medic, că va muri în curând.

Nu-mi venea să cred că în astfel de momente informația ți se servește exact așa.
— O lăsăm acasă. O să am grijă de ea mai bine decât la spital.
— Treaba voastră. Semnați refuzul de spitalizare.

Am semnat hârtia și am mers imediat în camera bunicii.
— Bunico, ce să-ți aduc? Vrei ceva?
— Vreau o banană.
— Nu ai voie banană. Ai diabet.
— Dă-mi o banană, Maxim. Acum chiar vreau o banană.

I-am adus o banană și a mâncat-o cu un asemenea poftă. Nu mai mâncase banane de foarte mulți ani din cauza diabetului. Pe fața ei a apărut un zâmbet. Dar nu pentru mult timp. După câteva minute, a început să verse puternic sânge. Am chemat imediat a doua ambulanță. A venit repede și, fără să ne întrebe nimic, au pus-o pe targă și au început să o scoată din apartament. Bunica se agăța de tocul ușii și striga că nu vrea să meargă nicăieri și că vrea să moară acasă. Am convins-o că la spital îi vor face o procedură și că noi vom veni. A fost de acord și am plecat la spital. Au început să o consulte chiar pe coridor și au dus-o într-un salon. Medicul ne-a spus să mergem acasă și că acolo e în siguranță.

— Bunico, aici ești în siguranță. Doctorul a spus că îți vor face toate procedurile și că vei veni curând acasă. Eu și tata venim mâine dimineață la șapte și îți aducem de mâncare. Bine?
— Mergeți acasă și odihniți-vă. Mie deja mi-e mai bine.
— Vin mâine după tine. Promit. Mâine mâncăm împreună și apoi mergem acasă. Te iubesc și o să le spun doctorilor să aibă grijă de tine.
— Și eu te iubesc. Mergeți și odihniți-vă, că v-ați chinuit azi cu mine.

Ieșind din salon, am aflat imediat care dintre femei va avea grijă de ea și i-am dat bani.
— Aveți grijă de ea. Când vedeți că i se face greață, întoarceți-o pe o parte. Faceți tot ce cere. Vă plătesc cât vreți. Doar să nu o lăsați singură. Îi place să vorbească cu cineva.
— Bine. O să facem totul la cel mai înalt nivel.

Eu și tata am plecat acasă și am stabilit că ne trezim la șase dimineața și mergem la bunica. Mai aveam doar câteva ore de somn, pentru că ne întorseserăm de la spital aproape la trei noaptea.

La șase dimineața au sunat și alarma mea, și a tatei. Fără să ne înțelegem, le-am oprit și ne-am mai culcat o oră. La șapte ne-am ridicat și am plecat la spital. Când am intrat în secție, ne-a întâmpinat un medic:
— Cine e fiul?
— Eu, — a răspuns tata.
— Veniți cu mine în cabinet, iar fiul dumneavoastră să rămână pe coridor.

Tata a intrat în cabinet, iar eu m-am dus în salonul unde era bunica. Când am intrat, nu era acolo.
— Unde e bunica? — i-am întrebat pe cei care erau cu ea în salon.
— Nu v-au spus?
— Ce să-mi spună?
— A fost dusă la reanimare.
— Când?
— Cu câteva ore în urmă.

Atunci am văzut pe balcon lucrurile bunicii.
— De ce sunt lucrurile aici?
— I-a fost foarte rău, au dezbrăcat-o. Au dus-o goală.

Am ieșit pe balcon și am început să strâng lucrurile într-o pungă. Erau ude, ca după o ploaie torențială. Atunci m-am gândit că poate au spălat-o și a stat așa udă. Când ieșeam din salon, o femeie de pe patul vecin mi-a spus:
— Țineți-vă, tinere.
— Mulțumesc.

M-am uitat la ea și nu înțelegeam de ce trebuie să mă țin. Bunica era la reanimare, iar acolo sigur aveau grijă de ea. Am mers pe coridor și l-am văzut pe tata stând tăcut la capătul lui.
— Bunica a murit.
— Ce? — mi-au țâșnit lacrimile instant și am căzut pe podea. — Cum a murit? Au spus că e la reanimare.
— Așa e procedura. Când moare un om, îl țin o perioadă la reanimare.

Am țipat în toată spitalul. Nu puteam să cred.
Coboram scările în lacrimi și isterie, lovind tot ce îmi ieșea în cale.
— Ei au omorât-o! N-au avut grijă de ea!
— Au făcut tot ce au putut, Maxim.
— Nuuu! Ei au omorât-o. Curvelor. De ce am adus-o aici? Acasă ar mai fi trăit mult.

Am făcut o criză de isterie. Am început să sun pe toată lumea și să spun că bunica nu mai e. Până am ajuns cu tata acasă, erau deja toate rudele și prietenii. Liza mă ținea cu ultimele puteri. Când stăteam în picioare, când cădeam. Nu puteam să cred că bunica nu mai e.

Tata a plecat să se ocupe de documente și de locul de înmormântare. Eu am rămas acasă și toți mă susțineau, cât puteau. Spre seară mi-am revenit și deja înțelegeam totul limpede.

— Mâine o aduc pe bunica acasă. Nu voia să plece, iar oamenii să-și ia rămas-bun de la ea acasă.
— Afară e cald, Maxim. Cum va sta aici, în apartament, pe căldura asta? Trebuie la morgă.
— Va dormi aici noaptea. Așa am spus și așa va fi. Să doarmă ultima noapte acasă. Nimic nu i se va întâmpla. Eu voi fi liniștit că ultima noapte a petrecut-o acasă.

În momentul acela era inutil să se certe cineva cu mine. Tata a fost de acord și a spus firmei funerare să o aducă acasă.

A doua zi, seara, trebuiau să o aducă pe bunica. De obicei îi aduc seara sau noaptea, ca să nu sperie vecinii. Stăteam acasă când s-a deschis ușa și am văzut cum bărbații aduceau sicriul. Nu m-am putut abține:
— Bunico! Bunica mea! De ce ai plecat? De ce trebuie să te aducă așa acasă?

Bărbații au pus sicriul în sufragerie, pe tabureți. Când au scos capacul, am văzut-o pe bunica. Nu se schimbase deloc. Nu o văzusem doar o zi, dar era la fel de frumoasă. Am sărit imediat în sicriu și am îmbrățișat-o. Nu mă puteau scoate de acolo. Mă țineam de ea și plângeam în hohote.
— O să dorm cu ea. Am dormit cu ea din copilărie. Lăsați-mă să dorm cu ea. Vă rog.
— Maxim, calmează-te. Ieși din sicriu și stai lângă ea.
— Nu. O să dorm cu ea. Lăsați-mă. E bunica mea.

Toți din casă au înțeles că e mai bine să nu se contrazică cu mine și au ieșit în bucătărie. După un timp m-am așezat lângă sicriu și am stat așa toată noaptea. Vorbeam cu ea și îmi ceream iertare că am dus-o la spital. Că am țipat la ea când nervii nu mai țineau. Că duceam tot felul de fete la restaurant, dar pe ea nu o invitasem niciodată. La un moment dat mi se părea că îmi răspunde și că avem un dialog.

La prânz a început ceremonia de rămas-bun. Ne-au dus la cimitir și mult timp nu au putut închide capacul, pentru că pur și simplu nu o lăsam din brațe. Liza și Alex, prietenul meu, m-au tras deoparte. Au pus capacul pe sicriu și l-au așezat pe frânghii. Îl coborau încet în groapă. Atunci m-am smuls din mâinile Lizei și ale lui Alex și am sărit în mormânt.
— Bunico! Nu pleca! Scoateți-o de acolo! E vie! O să trăiască cu mine! Luați-o de acolo! — urlam cu ultimele puteri.

Nu mai știu cine m-a scos din groapă. Îmi amintesc doar că m-am trezit în autobuz. Liza mă ținea și mă calma.
— Tu ai făcut-o să plângă, Liza. Gelozia ta a făcut-o să plângă. Eu nu iert lacrimile bunicii.
— Iartă-mă, Maxim.
— Niciodată. Era bolnavă și eu aveam grijă de ea. Iar tu credeai că aduc fete acasă.
— Iartă-mă. Te rog.
— Ați adus-o acasă?
În momentul acela, Liza și-a întors capul spre oameni, căutând răspunsul.
— Nu. N-am adus-o. A rămas acolo.
— De ce așa? De ce nu poate veni cu noi acasă?
  Oamenii din autobuz au înțeles că începuse delirul și mi-au dat imediat tinctură de valeriană. Nu mi-am revenit câteva zile. Stăteam în bucătărie și beam. Beam și beam, nu puteam să cred că bunica nu mai e. Uneori mi se părea că mă strigă din cameră. Mă ridicam și mă uitam dacă e acolo. Dar nu era.
Ea a fost cea mai bună femeie din viața mea. Credincioasă, bună, gospodină.
Într-un cuvânt — cea mai bună.
        `
    },
    {
        id: 'ch7',
        title: 'Barça',
        content: `
După moartea bunicii, totul a mers foarte prost. Viața mea a început să se destrame literalmente. Din când în când ieșeam cu Liza în oraș ca să ne revenim puțin și să ne curățăm gândurile. Într-una din zilele acelea, Liza mi-a spus că vine la ea un prieten din Barcelona, pe nume Alex. Nu știam nimic despre el în toți cei trei ani trăiți împreună și pentru mine a fost o mare surpriză să aflu că are un astfel de prieten. Mi-a povestit că au trăit mult timp în aceeași curte și că pentru ea el este ca un membru al familiei. Mi-a fost greu să cred asta până când mama ei mi-a confirmat că Alex este prieten din copilărie și, pe deasupra, gay.
  Ne-am stabilit întâlnirea în Deja Vu, pentru că într-o atmosferă de muzică și alcool cunoștința capătă un alt sens. Stăteam cu Liza la bar când, deodată, Alex a intrat în club. Un tip de statură medie, puțin plinuț, cu o față zâmbitoare, ca un european tipic. Liza i-a sărit imediat la gât și a început să țipe de fericire că l-a întâlnit după atâția ani. A venit după la mine și mi-a întins mâna.
— Salut. Mă cheamă Alex.
— Salut. Eu sunt Maxim.
— Știu. Liza mi-a povestit multe despre tine și vreau să-ți spun că am fost foarte fericit când i-ai făcut cererea de căsătorie. Ea te iubește nebunește și nu vede sensul vieții fără tine.
— Liza nu mi-a spus că mai vorbește cu tine. Dar dacă tot ați vorbit despre mine, o iert pentru această omisiune.
— Mi-a spus că ești foarte gelos și că îi interzici multe.
— A fost o mică greșeală cu niște mesaje din partea ei, de asta controlez lucrurile. Dar gata cu vorbitul despre mine și Liza. Hai să bem și cred că în noaptea asta ne vom cunoaște mai bine.
  Ne-am distrat și am ascultat povești despre cât de frumoasă și tare este Barcelona. Pentru noi, pe atunci, era un oraș de basm, unde totul este permis și unde prețurile sunt foarte mari comparativ cu Chișinăul. Ne-a surprins faptul că Alex fotografia străzile Chișinăului și trimitea pozele prietenilor săi din Barcelona.
— De ce faci asta?
— În Chișinău toate străzile au copaci de o parte și de alta. Este considerat cel mai verde oraș din Europa. În Barcelona nu există așa ceva. Acolo e doar asfalt și clădiri. Iar aici, uită-te ce frumusețe!
  Nu fusesem niciodată în Barcelona și nu știam că există așa ceva în lume. Se pare că aproape toate marile orașe ale Europei nu au copaci pe străzi, doar în parcuri. Stând și ascultându-l pe Alex despre cât de frumoasă este Barcelona, deodată ne-a propus să o vizităm:

— Veniți! Stați la mine. Vă arăt totul și vă povestesc. Trebuie doar să vă cumpărați biletele de avion.
— E o propunere bună, Alex, dar pentru asta ne trebuie bani. Eu nu o duc bine cu munca și nici nu-mi imaginez de câți bani am nevoie ca să mă simt confortabil acolo. După cum povestești și ce prețuri sunt, fără o mie de euro pe săptămână n-avem ce căuta.
— Important e să veniți, restul cheltuielilor le iau eu asupra mea.
— Ne gândim și îți spunem. Acum, pe capul beat, putem discuta orice — de la Antarctica până la cumpărarea unui ATV — iar mâine o să regretăm.
— Gândiți-vă. Eu plec peste o săptămână și am putea zbura împreună.

  După o oră, eu am uitat discuția. Dar nu și Liza. Asculta propunerea cu scântei în ochi și cu o speranță nebună că voi spune „da”. Tot drumul până acasă și chiar și acasă mi-a repetat că trebuie să mergem. Că nu avem nicio călătorie, că stăm acasă ca niște bătrâni.
— Liza, și eu aș vrea să zbor, dar de unde să iau banii?
— Trebuie doar să cumpărăm biletul. Restul plătește Alex.
— Și cum o să mă simt? Ca un sărac venit pe banii altuia? Dacă vreau să ieșim doar noi doi, trebuie să-i cer bani? Îți dai seama cum o să mă simt ca bărbat?
— Dar el a propus singur.
— Nu e corect, Liza. Eu trebuie să-mi asigur singur vacanța.
— O să-i cer mamei să ne ia biletele. Tu ia bani cât poți. Atât ne permitem. Îți promit că nu voi cere mult și că voi depinde complet de tine.
— Elizabeth, cu nevoile tale cheltuim tot bugetul din prima zi.
— Hai să mergem!
— O să mă gândesc.

  După o săptămână de discuții, am ajuns la concluzia că va merge doar Liza. Mama ei îi va da bani, iar Alex o va întreține acolo.

— De ce mama nu i-a dat bani și lui Maxim?
— Nu știu, dar probabil Liza a insistat mult și mama i-a făcut un cadou.
— Nu cred.

Înainte de plecare, între mine și Liza a avut loc un dialog:
— Liza, nu-mi place că Alex te cheamă atât de insistent la Barcelona.
— De ce?
— E ciudat. Te cheamă și e gata să plătească totul.
— E prietenul meu. Am crescut împreună. E normal să mă invite.
— E prea insistent.

  În ciuda rugăminților mele să nu plece, a rămas pe poziție. Până la plecarea ei, relația noastră a fost tensionată, vorbeam printre dinți. Eu nu voiam s-o las să plece, ea voia să vadă lumea. Și iată că a venit și ziua plecării. Cu câteva zile înainte ne-am certat și eu dormisem la mine dar știam de unde și la ce oră pleacă, așa că am venit mai devreme s-o văd și s-o conduc.
  Cu zece minute înainte de plecare apare taxiul, din care coboară Liza și mama ei. Am sărit imediat să le ajut cu bagajele.
— Salut, iubito.
— Salut, — a răspuns rece.
— Hai să te ajut.
Mi-a întins o geantă și am fost șocat cât de grea era.
— Câte lucruri ai luat, dacă pleci pe puțin timp?
— Max, știi că eu iau mereu multe lucruri.
— Dar nu chiar atâtea. Nu-mi place ce văd.
— Maxim, nu începe iar. Ai venit să mă conduci sau să-mi strici dispoziția?
— Am venit să-ți spun că nu vreau să te las să pleci. Să rămâi. Și să-ți spun că te iubesc.
— Maxim, eu plec. Cum îți imaginezi că renunț acum? Avem bilete, mama mi-a gătit pentru drum, Alex mă așteaptă acolo. Vrei scandal, ca de obicei?
— Nu-mi pasă ce scandal va fi. Simt că nu te vei întoarce.
— Termină. Mă întorc. Ce să fac eu acolo?
— Liza, știi că am presimțiri puternice. Sunt sigur că nu te vei întoarce.
— Mă întorc. Nu-ți mai face atâtea griji.

  O țineam de mâini și o priveam direct în ochii ei de neuitat. Vedea cât de tare mă doare, dar vedeam și eu în ochii ei că nu vrea să plece, dar trebuie. Mama ei stătea lângă noi și ne privea fix. Privirea ei mă ardea, dar nu puteam spune nimic. Țineam de mâini cea mai iubită femeie din lume și inima îmi spunea că o fac pentru ultima dată.
  Șoferul a chemat pasagerii. Am îmbrățișat-o cu toată puterea și am sărutat-o adânc. Buzele ei erau dulci, ca întotdeauna. Sărutul a fost pasional, dar ușa s-a închis și ea era deja în după geam. Parcă plecau intenționat încet. Ea mă privea prin geam, iar eu pe ea. Nu puteam crede că pleacă. Apoi autobuzul a dispărut în trafic. M-am întors spre mama ei și am izbucnit în lacrimi.
— Nu se va întoarce. Simt asta. De ce ați făcut asta?
— Se va întoarce. O cunosc. Nu poate fără tine. Nici o săptămână nu va trece.
— Nu! Țineți minte: nu se va întoarce!

— La fel a fost și la mine. Cea mai mare iubire a mea a plecat.
— Tot la Barcelona?
— Nu mai țin minte. Am goluri de memorie. Dar e foarte asemănător cu povestea mea.
— Ce vă amintiți?
— Durerea. Atât. O durere cum n-am mai simțit niciodată.
— O mai simțiți?
— Uneori. O visez și apoi uit tot.
— Pot continua lectura?
— Citește.

  După ce mama ei m-a îmbrățișat, am plâns și mai tare. Am mers spre casă, vreo patru kilometric pe jos. Am plâns tot drumul. O sunam pe Liza și o rugam să coboare din autobuz. Ea mă liniștea și spunea că va fi bine. Plângea și ea, dar spunea că pleacă doar pentru puțin timp.
  Nu știu cum am ajuns acasă. Am luat direct whisky. Legătura cu Liza dispăruse deja — trecuse granița. Am băut și am sunat-o pe mama ei, i-am spus tot. Ea tăcea și era de acord. Am vorbit până am adormit la masă, ca ultimul alcoolic.

  Dimineața, capul îmi crăpa, dar mai rău era că nu aveam niciun apel de la Liza. Nici mesaj. Ziua a fost un iad. Am stat în pat cu o sticlă de whisky. Am adormit dimineața și m-a trezit vibrația telefonului. Număr străin.
— Alo.
— Salut, iubirea mea!
— Salut, dragostea mea. Ai ajuns?
— Da. Alex m-a întâmpinat, mâncăm și mă culc. Două zile n-am dormit. Tu ce faci?
— Mi-e dor de tine.
— Ai băut?
— Iubito, „a bea” e când ții minte. Eu nu țin minte nimic.
— Cu cine ai băut?
— Singur.
— Femei erau?
— Ce femei, iubito?
— Dacă aflu că ai băut cu femei, vin și rup ouăle.
— Dacă așa vii mai repede, mă duc azi să beau cu fete.
— Maxim, nu căuta scandal.
— Bine, dulcețea mea.


  Apelul acela mi-a adus un calm temporar, dar neliniștea nu dispăruse. Am așteptat următorul ei apel toată ziua, cât timp dormea. Nervi, nervi și iar nervi — așa pot descrie ziua aceea. Deși știam că este la un prieten, ceva mă rodea adânc pe dinăuntru.
  Seara, Liza m-a sunat. Printre vorbele ei, îl auzeam pe Alex vorbind cu cineva.
— Cu cine vorbește Alex?
— Cu nimeni.
— L-am auzit clar.
— Maxim, hai să vorbim mai târziu. Începi să ai fantezii.
  Mi-a închis în nas.
  Și iată momentul meu „preferat” într-o relație: când suni și ți se respinge apelul. Te scoate din minți. Începi să scrii mesaje, nu primești răspuns. Suni din nou — respins. Și exact atunci ești la un pas să scrii un mesaj de care vei regreta. Și chiar când ești gata să arunci tot ce ai în suflet, primești răspuns.
— Ce, Maxim?
— De ce nu răspunzi?
— Pentru că faci scandal.
— Am întrebat cu cine vorbea Alex.
— Cu un prieten.
— Era greu să spui asta?
— Ar fi trebuit să-ți explic cine e și n-ai fi crezut.
— Dacă spuneai normal, nu era nimic.
— Te cunosc, Maxim. N-ai fi lăsat-o baltă.
— Ce prieten?
— Un prieten de-al lui Alex.
— A venit în vizită?
— Locuiește la el.
— Super. Te-a chemat la el acasă, unde mai stă și altul. De ce nu mi-a spus de la început?
— E de curând aici. S-au cunoscut în avion. Avea probleme cu zborul și a rămas câteva zile.
— Nu-mi place deloc. Cum să gândesc eu că tu stai cu doi tipi?
— Ai încredere în mine sau nu? Nu e genul meu. E foarte arogant. Din Moscova, genul că toți îi sunt datori.
— Nu mă interesează cum e el. Vreau doar să nu vorbești cu el.
— Nici nu vorbesc. Tocmai m-am trezit, am mâncat și te-am sunat.
— Când pleacă?
— Curând. Crezi că nu vreau să plece?
— Nu mă face să fiu gelos. Am mai multă încredere în tine decât în mine. Dar să nu vorbească cu tine.
— Bine, Maxim.
  Am vorbit încă vreo două ore despre nimicuri. Țineam conversația lungă doar ca să știu că nu vorbește cu altul. Aproape adormind, i-am urat noapte bună și am rugat-o să nu stea cu ei.

  A doua zi m-am trezit cu mesaj: „Mergem toți trei la piscină.”
Cum ai reacționa tu? Iubita ta merge la piscină cu prietenul și încă un tip. De rahat, nu? Am sunat-o imediat.
— Cum e piscina?
— Bine. Ne bronzăm.
— Cu cine?
— Cu Alex și Ivan.
— Și asta ți se pare normal?
— Ce e rău? Am venit să mă odihnesc. Vreai să stau doar în casă?
— Nu am nimic cu odihna ta. Am cu tipul ăla.
— Nici nu mă uit la el. Face pe interesantul.
— Să se bronzeze și să-și caute bilet spre Moscova.
— Și pe mine mă enervează.
— Sună-mă când ajungi acasă.

  Da, sunt gelos. Dar în ziua aia eram tata geloziei. Toată ziua mesaje scurte. Ne-am certat din nimic. Seara nici nu ne-am urat noapte bună.
  Dimineața m-a așteptat o scrisoare lungă de la Liza:

„Salut. Maxim, îți scriu asta sperând că mă vei înțelege. Am plecat la Barcelona ca să-ți fie dor de mine. Să văd cum te porți. Credeam că o să mă rogi să vin acasă. Dar tu doar îmi spui ce să fac și cu cine să vorbesc. Suntem într-o casă și e urât să nu vorbesc cu toți. M-am gândit mereu la un lucru: de ce nu m-ai scos din autobuz? Dacă m-ai fi tras cu forța, aș fi venit cu tine. Tu doar mi-ai spus să nu plec. Pentru mine a fost puțin. Voiam să văd un bărbat care își asumă și mă ia. Te-am văzut slab. Am plâns tot drumul. Și aici plâng. Ei au încercat să mă scoată la piscină să nu mai plâng. Nu ca să mă vadă în costum de baie. Eu am plâns și acolo, pentru că doar cu tine am fost la piscină. După toate astea, îmi faci scene de gelozie. Trebuie să ne despărțim. Fiecare să-și construiască viața. Te iubesc, dar povestea noastră se termină. Adio.”

Am citit mesajul de zeci de ori. Nu puteam crede. M-a acuzat frumos. Și era dreptatea ei. De ce n-am scos-o din autobuz? Am răspuns cu un singur cuvânt: „OK”. După care am mers să beau.

  O săptămână am băut până mi-au interzis intrarea peste tot. Spărgeam mese, pahare, oglinzi. Poliție, pază. Noroc că erau prieteni. O săptămână a trecut ca o zi.
Prietenii îi spuneau cât sufăr. Ea nu reacționa.
— Spune ceva?
— Zice că îți va trece.
— Spune că mă iubește?
— Nu.
  Eram beat mort când Rома mi-a spus:
— Maxim, Liza nu e în Barcelona.
— Ce dracu’? Unde e?
— La Moscova. Cu tipul ăla.
— Ce pula mea? Ce Moscova?!
— Max, mâine îl suni pe Alex și afli tot.
— Crezi că Alex e vinovat? Eu cred că nu doar el.

— Cum a putut să facă așa ceva? Parcă s-au înțeles dinainte. Săracul Max…
— Mai departe în carte se explică de ce s-a întâmplat asta. Continui.

  Și din ziua aceea am mai băut încă treizeci și trei de zile la rând. Și dacă crezi că beam puțin, te înșeli. În toate zilele acelea nu-mi amintesc nici măcar o dată cum am ajuns acasă. Mă trezeam acasă și mă miram că sunt viu. În a patruzecea zi m-am trezit în reanimare. La început am crezut că e o glumă, că aparatele sunt un vis. Dar nu era.
— Doctore, ce am?
— Ați avut o cădere nervoasă și epuizare. Mai bine vă spune mama.
  Nici nu știam că sunt în spitalul unde lucra mama. Mă pregăteam s-o liniștesc. Eram sigur că va intra plângând. Dar a intrat cu o față de piatră.
— Dă-mi numărul curvei. O rup.
— Care?
— Al Lizei! Crezi că nu știu de ce ai băut?
— Nu e vina ei.
— Dă-mi numărul, am spus. Câte zile ai băut?
— Mult am dormit?
— Zece ore.
— Atunci ieri a fost ziua patruzeci.
— Și munca?
— Dormeam înainte de muncă și beam la muncă.
— Și directorii?
— Le-am zis că distrez clienții. Îmi dau bani. Lor le convine.
— Ești idiot? O să pierzi tot din cauza ei. Stai aici minimum zece zile. Ai văzut analizele? Pulsul și tensiunea abia se văd.
— Mamă, dacă-ți spun că o iubesc și nu pot fără ea?
— Nu e o soluție. Fii bărbat. Rezolvă problema, nu plânge.
  A plecat la fel cum a intrat. Eu am rămas ca un idol. Aparatele piuiau. Manșeta de tensiune se umfla și se dezumfla.
  Telefoanele sunt interzise în reanimare. Dar am convins asistenta. Toți o respectau pe mama. I-am scris lui Alex dacă poate vorbi și mi-a zis că mă sună seara.
  Când m-a sunat, am cerut voie la toaletă. Am scos senzorii — toate aparatele au început să piuie.
— Nu puteți merge. Vă aduc plosca.
— Nu pot așa vreau la toaletă.
— Atunci nu vreți destul.
Am convins-o să-mi pună senzorii vecinului.
M-am încuiat în toaletă și l-am sunat pe Alex.
— Salut. Cum ești?
— Bine. Tu?
— Spune-mi cum a ajuns Liza la Moscova.
— Ești sigur?
— Spune!
— Am fost șocat. A venit. Eu și Ivan am întâmpinat-o. Ea îi scrisese lui că ar fi tare să o întâmpinăm amândoi.
— Cum i-a scris dacă nu-l cunoștea?
— Când am zburat la Barcelona, i-am spus că am cunoscut un tip din Moscova. Trăia la mine. Ei au început să vorbească. Ea se interesa de el și el de ea. I-am dat profilul ei.
— Și de ce nu mi-ai spus?
— Cum să-mi vând prietena? Ascultă mai departe. Când a coborât din autobuz, s-a aruncat în brațele lui. Stăteau ca porumbeii. Țineau de mâini. A propus piscina ca să-i vadă mușchii. Noaptea îi auzeam gemetele din dormitor. Dimineața mi-a spus că va fi cu el. I-am dat afară imediat din casa mea. Apoi am aflat că sunt la Moscova.
— Ce dracu’ spui…
— Așa a fost. Te-a mințit. Nu plângea. Se distra.
— Vorbim mâine.
— Noapte bună.

Am ieșit din toaletă alb la față. După cinci pași, m-am prăbușit pe podea și nu am înțeles ce s-a întâmplat. Îmi amintesc cum asistenta mă pălmuia tare ca să-mi revin. M-a ridicat și m-a pus pe pat, conectând rapid toate aparatele, ca nimeni să nu observe că mă ridicasem.
— A fost ultima dată când am făcut asta. Dă-mi telefonul. Îl vei primi înapoi la externare.
— Iertați-mă, vă rog… mi s-a făcut rău.

  După tot ce auzisem, toate aparatele luau-o razna. Totul piuia, doctorii au intrat în fugă. Mi-au băgat ceva prin cateter și m-am mai liniștit. Mă uitam într-un punct fix din tavan și nu-mi luam ochii de acolo. În cap îmi răsuna fiecare cuvânt spus de Alex. Nu puteam accepta că ea făcuse asta. Omul cu care voiam să-mi leg viața.
  Am stat în reanimare patru zile, fără telefon, sub piuitul continuu al aparatelor. În a cincea zi m-au mutat la neurologie. Pastile, injecții, liniștire forțată a anxietății.
  După externare, primul lucru a fost să-mi sun prietenii. Aveam nevoie de adevăr. Ei erau în legătură cu ea și știau tot.

— Salut, Roma. Ce faci?
— Salut. Mă duc în oraș.
— Unde?
— Nu o să crezi. Mă văd cu Liza.
— Serios? E în oraș?
— Da. A venit ieri.
— Unde vă vedeți?
— De ce te interesează? Va fi cu noul ei tip.
— Ești nebun? Unde?
— La „Mojito”. Dar nu ți-am spus eu.
— La ce oră?
— La patru.
— Vin.
  Am ieșit din spital, am mers acasă, duș, haine curate. Trebuia să arăt perfect. Să știe ce a pierdut. Nu știam ce voi face — să mă așez la masa alăturată sau să trec pe lângă ea?
  Stăteam lângă fântână și i-am văzut. Roma, ea și Ivan. Uite-o, curva. Cum poate? M-a văzut și ea. Se uita constant spre mine. I-am scris lui Roma:

— Vin la voi.
— Nu. Liza te-a văzut și a cerut să nu vii.
— Ce, pula mea?
— Lasă-mă să vorbesc cu ei.
Am stat și i-am privit vreo douăzeci de minute. Roma s-a ridicat și a venit la mine.
— Salut, Max.
— Și?
— Nimic. Ivan zice că poți veni. Liza nu vrea.
— De ce?
— A spus că nu te mai iubește și că are alt viitor.
— A spus asta?
— Da.
— Atunci n-am ce căuta acolo. Spune-le salut și succes.
— Tu unde mergi?
— Prin oraș. Sună-mă când terminați.
 Nu-mi venea să cred cât de repede se poate schimba un om. Roma m-a sunat după întâlnire.
— Cum a fost?
— Tipul e ok. Vorbește bine despre tine.
— Ea a zis ceva de mine?
— Nu. A cerut să nu se vorbească despre tine.
  Liza a decis să rămână în Chișinău, pentru că părinții ei veniseră din Europa. El urma să plece cu munca. Nu știam ce să fac. Ea îmi scrisese să fiu bărbat și să iau decizii. Dar cum să le iau, dacă nu știam ce vrea ea? Am decis s-o las în pace. Am pierdut șansa.

— Slab. Pentru fericire trebuie să lupți cu dinții.
— Nu cred că ea se simțea regină.
— Când iubești, nu faci așa. El n-a umblat după femei. Ea a ridicat coada în a doua zi.
— Există slăbiciuni.
— Slăbiciune e una. Trădarea e alta.
— Vrei să oprim lectura?
— Nici vorbă. Vreau să știu ce a mai făcut curva aia. Da, povestea asta îmi provoacă dezgust. Și a mea a făcut la fel. Nu mai țin minte cum, dar senzația asta n-o voi uita niciodată. Ura și scârba.
— Simți acum la fel ca atunci?
— Da. Și curva aia m-a trădat. Nu mai țin minte detaliile, dar sentimentul nu dispare. Am rămas tăcut. În mine nu mai era nimic — nici durere, nici lacrimi. Doar un gol rece. Atunci am înțeles un singur lucru: nu toate poveștile de dragoste se termină frumos. Unele se termină cu o sticlă goală, un pat de spital și o amintire care nu te mai lasă niciodată
        `
    },
    {
        id: 'ch8',
        title: 'La revedere, dar nu până la capăt',
        content: `
Așa cum spuneam și înainte, am o intuiție bine dezvoltată și știam că mă va suna. Nu mi-am schimbat numărul doar pentru ca ea să poată lua legătura cu mine, dacă va avea vreodată dorința asta. Pe la nouă seara am văzut că mă sună un număr dureros de cunoscut — cel pe care îl știu pe de rost.

— Salut, — a spus Liza la telefon. Vocea asta mă scotea din minți încă din prima zi în care am auzit-o.
— Salut.
— Ce faci?
— Așa și-așa. Stau acasă și aștept apelul tău.
— Și de ce nu m-ai sunat tu?
— Nu știam când pleacă noul tău iubit și nu voiam să aveți un scandal.
— Ei bine, a plecat, și aș vrea să vorbesc cu tine. Avem multe întrebări și aș vrea să le discutăm.
— Vrei să vorbim la telefon?
— Nu, vreau să ne vedem. Hai pe undeva pe lângă casa mea, ca să pot reveni rapid dacă sună și să-i răspund la apel video.
— Pot fi la barul de lângă tine în 15 minute. Poți?
— Da, hai acolo peste cincisprezece minute.
  Știind cât de mult întârzie de obicei, puteam liniștit să ajung peste o jumătate de oră sau chiar o oră. Dar, surprinzător, a venit la timp. Când am văzut-o, am izbucnit în plâns. Nu o mai văzusem de atât de mult timp și îmi doream atât de tare să o îmbrățișez. Cât de mult îmi lipsise. S-a așezat la masă, mi-a luat ambele mâini și pur și simplu ne-am privit în tăcere și am plâns. Ne era clar că ne iubim foarte mult și că am făcut greșeli. Acum trebuia doar să vorbim și să înțelegem dacă vom rezolva ceva sau vom regreta toată viața că ne-am despărțit.

— Hai, poate ar trebui să vorbim?
— Da. Destul cu plânsul. Dar mâinile tale nu le dau drumul.
— Bine, Maxim. Le poți ține.
— Cum ești?
— Când ești lângă mine, îmi e bine.
— Și mie îmi e bine acum. Dar hai să stabilim să nu ne spunem lucruri care ne-ar putea răni.
— De acord.
— Deci, Liza. Cum s-a ajuns aici?

— Cum s-a ajuns, așa s-a ajuns. Dar am aflat că ai vorbit cu Alex. Vreau să știu ce ți-a spus, pentru că noi nu mai vorbim din momentul în care am plecat din Barcelona.
— Mi-a spus că ai mers acolo cu scopul de a te cunoaște cu cineva și că ai planificat totul dinainte. Și că din prima zi ați dormit împreună.
— Tu crezi asta?
— Nu vreau să cred. Dar eu nu eram acolo și nu știu ce să cred.
— Atunci lasă-mă să-ți spun cum a fost de fapt. Așadar, Alex zbura spre Barcelona cu escală la Minsk. În avionul care zbura din Minsk spre Barcelona l-a cunoscut pe Ivan. În timpul zborului Alex îi arăta poze și îi povestea cât de frumos e la noi, la Chișinău. Pe una dintre fotografii apăream eu  când ne plimbam împreună. Ivan a început să-l întrebe cine sunt și ce e cu mine. Alex i-a spus că sunt prietena lui și că am un iubit. După asta, Alex a zis că mă poate aduce la Barcelona și să mă prezinte lui Ivan. Așa s-a întâmplat că Ivan plănuia să vină pentru o săptămână în Barcelona, dar a rămas aproape trei. Da, Ivan îmi scria, dar conversația era de nimic. Le spuneam și lui, și lui Alex, că vin doar dacă Ivan pleacă. Într-una din zile, Alex mi-a spus că e singur și că Ivan a plecat. Atunci am decis să vin la Barcelona. Dar la sosire m-a așteptat o surpriză. Alex m-a întâmpinat cu Ivan. Bineînțeles că l-am întrebat imediat pe Alex ce e asta. Mi-a spus că Ivan mai stă câteva zile pentru că a pierdut zborul. Nu am vrut să-ți spun asta la telefon, dar tu deja îi auziseși vocea atunci și ai înțeles totul singur.
În prima zi am dormit aproape toată ziua după drum. Când m-am trezit, Alex m-a invitat la masă, unde stătea Ivan. Am refuzat și nu am vrut să mănânc cu ei. I-am spus lui Alex că nu voi sta să mă cunosc cu omul ăsta. A doua zi m-am trezit și Ivan nu mai era. Alex mi-a spus că a plecat. Atunci Alex m-a invitat la piscină. Stăteam la piscină și vine Ivan. Am fost în stare de șoc total când l-am văzut. A spus că a încurcat ziua și că zborul lui e mâine. Stăteam și făceam plajă, fără să acord atenție semnelor lui de atenție. Ba îmi aducea de băut, ba mă aștepta cu prosopul când ieșeam din apă. Dar îl ignoram. Tot timpul ăsta mă gândeam doar la tine și îmi era dor. După piscină am venit acasă și te-am sunat imediat. M-am închis în cameră și nu voiam să-i văd. Deja mă gândeam să-ți spun ce se întâmplă aici și că vreau acasă. Dar i-am mai dat o zi să plece. Ei stăteau în bucătărie și discutau ceva. La un moment dat a început cearta între ei. Au început să țipe unul la altul. Abia după asta am înțeles că era încă un plan de-al lor, ca eu să fiu cu Ivan. Am ieșit din cameră și atunci Alex a început să țipe să ieșim, eu și Ivan, din casa lui. Mult timp l-am întrebat ce legătură am eu și ce am făcut. Dar nu a putut explica nimic normal. Am început să plâng și voiam să te sun, dar Ivan m-a apucat și a zis să plecăm mai repede. Ne-am strâns lucrurile și am ieșit din casă. Am intrat în prima cafenea și ne gândeam ce să facem. Am spus imediat că te voi suna și vom decide totul. Dar problema a fost că am uitat încărcătorul la Alex și mi s-a descărcat telefonul. Atunci Ivan a început să caute transport ca să pot ajunge la Chișinău. Dar nu era nimic liber. Cel mai apropiat drum era peste o săptămână. Atunci Ivan a început să-mi caute bilet de avion spre Moscova, iar de acolo urma să zbor spre Chișinău. Ieșea așa că ajungeam la Moscova și a doua zi, noaptea, trebuia să zbor spre Chișinău. Nu puteam și nici nu voiam să te sun, pentru că voiam să-ți fac o surpriză. Am zburat spre Moscova a doua zi. Toată noaptea am vorbit și am înțeles că nenorocirea asta ne-a apropiat foarte tare. Deja stăteam ca niște prieteni. Ajunși la Moscova, m-a dus imediat la el acasă ca să dorm și a doua zi să zbor spre Chișinău. Dar, intrând la el, am băut și ne-am sărutat pentru prima dată. Atunci am decis pentru mine că te-am înșelat și că nu pot să zbor la tine. Eram sigură că îți voi spune și că nu mă vei ierta. Atunci am înțeles că, dacă am făcut o asemenea greșeală, trebuie să rămân cu el și să trăiesc cu păcatul ăsta. Cam asta a fost ce am avut acolo. Toate zilele astea am plâns. Nu puteam fără tine. Ți-am scris o scrisoare și am fost în șoc când mi-ai răspuns cu un singur cuvânt: „OK”. Îmi reporneam telefonul și verificam mereu dacă nu mi-ai mai scris ceva. Dar nu, doar asta ai scris. Nu puteam să cred.
— Sunt atât de furios că l-am crezut pe Alex. Liza, cum așa? De ce s-a întâmplat asta? De ce ai crezut că nu te-aș fi iertat? Știi cât de mult te iubesc. Știi că te-aș fi iertat orice. De ce nu ai venit? De ce nu m-ai sunat?
Stăteam ținându-ne de mâini și amândoi ne-am lăsat privirile în jos. Nu puteam să cred ce mi-a povestit. La un moment dat privirile noastre s-au întâlnit și am început din nou să plângem. Momentul a fost întrerupt de telefonul Lizei.
— Tata mă sună.
— Atunci răspunde.
— Nu, nu îi răspund.
— Ce i-ai spus? Unde ai zis că mergi?
— I-am spus că am ieșit la plimbare.
Tatăl ei a mai sunat de două ori, dar ea nu a răspuns. Apoi m-a sunat pe mine.
— Nu-i răspunde.
— De ce? Lasă-mă să răspund.
— Răspunde, dar să nu-i spui că ești cu mine.
— Ok.
Adunându-mi gândurile, am răspuns:
— Alo?
— Maxim, salut.
— Bună seara.
— Unde ești acum?
— În bar.
— Liza e cu tine?
— Nu, bineînțeles. Ce să caute cu mine?
— Sigur nu e cu tine?
— Sigur nu e cu mine.
— Maxim, dacă aflu că e cu tine, te găsesc și îți smulg ouăle cu mâna mea.
— Pentru ce?
— Ea are o viață nouă. Un nou iubit. Educat, cu scopuri. Iar tu ești un pierde-vară care nu va ajunge niciodată nimic în viață. Vei rămâne un nimeni.
— Foarte plăcut să aud asta de la dumneavoastră. De ce nu mi-ați spus asta mai devreme?
— I-am spus Lizei. Ție nu are rost să-ți spun. Ești prost ca un dop.
— Atunci să fie cum spuneți dumneavoastră.
— E cu tine?
— Asta nu mai contează.
— Ai înnebunit? Unde ești acum? Unde stați?
— Sunt atât de prost încât nici nu pot spune adresa unde stau.
— Cum se numește localul?
— Vai, nici nu-mi amintesc. Doar v-am spus că sunt prost. Dar dumneavoastră, ca om deștept, ar trebui să mă găsiți. Noapte bună.
Am închis. El continua să sune și să scrie mesaje, de care eu și Liza râdeam. Ne era bine în momentul ăla.
— Spune-mi, puiule, vrei să fii cu mine?
— Și mă vei ierta pentru înșelat?
— Desigur.
— Și nici măcar la cea mai mare ceartă nu-mi vei scoate asta în față?
— Noi o să ne certăm?
— Maxim, pentru noi cearta e ca sportul. Suntem deja profesioniști în categoria noastră.
— Nu-ți voi aminti asta, desigur.
— Atunci am un plan. Trebuie să zbor curând la Moscova. Oricum trebuie să-mi iau lucrurile de la el. A început să ridice mâna la mine pentru că plângeam prea des și îi spuneam că te iubesc și că vreau la tine, și a început să mă bată. Voi zbura la Moscova și îi voi face un scandal. Mă va bate din nou și imediat îmi iau lucrurile și zbor.
— Vrei să spui că te bate și tu suporți? Liza, ești în toate mințile?
— Dar ce să fac? Ție ți-am fost infidelă. Părinții l-au cunoscut și le-a plăcut de el. Stau și îndur, ca o proastă.
— Liza, ce faci? Cum ai ajuns să-ți permiți așa ceva?
— Prima dată l-am numit din greșeală Maxim, și din nervi a bătut doi trecători. Apoi mi-a spus că și cu mine va fi la fel dacă nu mă opresc. Dar nu puteam. Plângeam mereu după tine și a început să mă bată. Dar hai să nu vorbim acum despre asta. Vreau să ținem planul. O să-mi cumpăr o cartelă nouă și te voi suna eu. Nu vreau ca tata să scoată lista de apeluri și să fie numărul tău acolo. Când voi fi la Moscova, te voi suna pe Skype. Fă-ți acolo un cont cu numele Mary și pune o poză de fată. O să-i spun că vorbesc cu o prietenă și nu va verifica. Eu voi fi mereu cu căști și așa vom putea fi în legătură tot timpul.
— Mă uimești, Liza. Nici nu pot imagina ce făceai când erai cu mine.
— N-am făcut niciodată nimic cu tine. Doar mă gândesc la planul ăsta în fiecare zi.
— Atunci să facem cum spui.
 Asta e fata mea. Era cea mai tare. Întotdeauna am fost mândru de ea și o admiram.
 Când tatăl ei a început să sune fără oprire, am decis să ne despărțim. Ea și-a chemat un taxi, iar eu pe al meu, ca să nu mergem în aceeași mașină și să nu fim văzuți de cineva.

— Am plecat. Așteaptă apelul meu.
— Bine, iubirea mea.
M-a sărutat ca prima dată. Așa cum îmi place mie. Sărutul acela de care îmi era dor. Mușcându-mi buzele și ținându-mă delicat de față. Un sărut despre care poți doar să visezi.
— Pa, dragostea mea. Plec.
— Pa, dragostea mea.
Ea a plecat, iar eu m-am urcat în taxiul meu și am început să citesc tâmpeniile și amenințările tatălui ei. Îmi era indiferent ce scria, pentru că nu aveam nevoie de nimeni în afară de ea. Iar amenințările sunt doar vorbe goale ale unui tată care își iubește fiica și vrea ce e mai bun pentru ea.

— Ce idiot. Iar a iertat-o pentru înșelat. I-am spus încă de la prima ei trădare că o va repeta. Oamenii nu se schimbă. Citește mai departe, Alisa.

A doua zi Liza m-a sunat de pe un alt număr.
— Salut, Maxim.
— Salut. Ce ciudat e să văd că mă suni de pe alt număr.
— Important e să nu-ți schimbi tu numărul. Că te găsesc și de sub pământ.
— Cu abilitățile tale sunt familiarizat. Cum ești? Cum a fost ieri? Cum e tata?
— Sunt bine. Tata a țipat, dar i-am spus că aveam telefonul pe silențios și că pur și simplu m-am plimbat. Și chiar dacă aș fi văzut că mă sună, tot nu aș fi răspuns, pentru că voiam să fiu singură.
— Ne vedem azi?
— Două zile la rând nu pot ieși și să nu-i răspund. Mai ales că o să mă urmărească, asta e sigur sută la sută.
— Mi-e dor de tine.
— Dacă ai ști cât de mult mi-a fost dor de tine și cât de mult îmi e dor acum, nu ai spune asta.
— Te iubesc.
— Și eu te iubesc! Gata, închid. Mâine zbor. Ivan mi-a cumpărat biletul. Așa că te sun înainte de zbor și apoi trecem pe Skype.
— Bine, puiule. Te iubesc și aștept apelul.
— Și eu te iubesc.
  Of, cât de greu e totul. Greu să știi că e aici, aproape, și să nu o poți vedea. Și am început să-mi amintesc ce a scris în scrisoare — că vrea să fiu un bărbat adevărat. Poate mâine să nu o mai las să plece? Să o iau la mine și să pun capăt tuturor acestor zboruri? Nu o voi lăsa să plece! Mă va suna și nu îi voi permite să plece! Am intrat imediat pe site-ul aeroportului și am verificat zborurile spre Moscova. Erau patru zboruri pe zi, cu o diferență de doar o oră între ele. Să ghicesc pe care zbor va fi era greu, dar posibil. Și mai greu era că check-in-ul începea cu două ore înainte de plecare, iar eu nu știam când vor ajunge. Plus că nu știam dacă va fi cu tatăl ei sau nu.
Cu o oră înainte de decolare, Liza m-a sunat.
— Maxim, salut! Ce faci?
— Sunt la aeroport. Am venit să te iau. Nu vreau să te las să pleci ca data trecută.
— Dragul meu, ce faci? Nu trebuie să faci asta. Și unde ești? Nu te văd.
— Ce, ești deja aici?
— Da, am trecut controlul de pașapoarte. Mai departe e doar drumul spre Moscova.
— Cum așa, Liza? Spune că ți-e rău. Spune că s-a întâmplat ceva acasă. Nu au dreptul să te țină acolo. Eu sigur nu pot intra în zona de așteptare.
— Nu mă mai lasă înapoi. Am trecut controlul. Apreciez foarte mult că măcar încerci să faci ceva, dar acum nu se mai poate schimba nimic.
  A fost o dezamăgire. Cum de nu am observat-o? Cum de am ratat-o iar? Am vorbit până în ultimul moment, până la decolare. I-am dat noul meu Skype, pe care îl creasem. Râdeam de poza pe care o pusesem. A spus că nu mai avusese prietene de mult timp, iar acum apăruse o oarecare Mary, pe deasupra și urâtă. Și iată că încep ultimele proceduri înainte de zbor: verificarea biletului, îmbarcarea în autobuzul spre avion. S-a așezat pe locul ei și a venit momentul despărțirii.
— Gata, asta e. Trebuie să-l sun pe Ivan și să-i spun că decolăm. Te sun imediat ce pot, bine? Te pup și te iubesc. Așteaptă-mă.
— Zbor plăcut, puiule. Și eu te iubesc foarte mult și te aștept acasă.
La fel ca prima dată, am privit cum se îndepărtează autobuzul, iar acum urmăream cum se ridică avionul. Un deja-vu neplăcut. Dar nu-mi rămânea decât să aștept. Aveam încredere în ea și în planul ei și știam că asta se va termina foarte curând.

— De două ori l-a înșelat și de două ori a pierdut-o. Cuplul ăsta e pe măsura celuilalt la nivel intelectual. E iubire sau prostie?
— Cred că e iubire.
        `
    },
    {
        id: 'ch9',
        title: 'Hai să ne ascundem',
        content: `
Pe la zece seara, în aceeași zi, am primit primul apel pe Skype de la Liza.
— Mary, salut. Am ajuns cu bine, totul e ok.
— Salut, puiul meu. Mi-e teamă că o să mă obișnuiesc cu numele ăsta dacă nu vii mai repede.
— Hahaha. Da, totul e bine. Ivan m-a întâmpinat și stă aici lângă mine. Ne ascultă.
— Nu cumva îmi aude vocea? Că nu știu să imit vocile lui Mary.
— Nu, desigur.
— Vorbești cu căști?
— Da. Apropo, mulțumesc pentru cadou. Mi-au fost foarte utile în avion.
Atunci am realizat cât de obsedată de detalii este Liza, încât și-a dat seama încă din aeroport că, dacă vorbește cu mine, o poate face doar cu căști, ca Ivan să nu-mi audă vocea. Și și-a cumpărat căști din aeroport. Nu-i așa că e cea mai minunată femeie din lume?
— Cum a fost zborul? Asta întreb eu, nu Mary.
— Totul a fost bine. N-am putut dormi. Am zburat și m-am gândit că deja mi-e dor de tine.
— De mine sau de Mary?
— Mi-e dor, Mary, și tare. Vreau deja ori să mă întorc, ori să vii tu.
— Mary poate să vină. Dar lui Ivan nu i-ar plăcea o asemenea prietenă.
— Ar fi o situație amuzantă. Tu ce faci?
— Și mie mi-e dor de tine. Cum te-au primit?
— Bine. Stă aici și mă mângâie pe cur.
— Pula mea, de ce îmi spui asta? Sunt nervos că respiră lângă tine, iar tu îmi spui că te mângâie.
— Iartă-mă. N-am gândit.
— O să am o seară minunată gândindu-mă că ești cu el în același pat. Liza, poți să nu te culci cu el până vii? Ar fi și un motiv să facă scandal.
— O să încerc. Dar e stupid.
— Te rog să încerci din răsputeri. Că nu-mi mai găsesc locul. Aș vrea să-ți dai jos căștile, să-mi audă vocea, să înceapă scandalul și să vii cât mai repede.
— Nu așa. Știu ce fac și știu cum o să rezolv. Gata, fug. Noapte bună. Și un sărut de la mine, bebelușului.
— Bebelușului? Nu-mi ajunge că sunt Mary, mai am și copil?
— Da. E foarte dulce. Vă pup pe amândoi și pe mâine.
— Pe mâine, iubita mea. Te iubesc tare și mi-e dor de tine.
  După ce a închis, am început să fumez țigară după țigară. În cap, gânduri despre ce face acum. Îl sărută? Se fut deja? Îi face un blowjob? E un căcat total, simt că-mi explodează capul. Gândurile astea te pot duce la acțiuni imprevizibile. Așa că trebuie să mă calmez. Ce pot decide acum? Am pierdut-o singur de două ori și acum stau și mă gândesc ce fac ei acolo. Chiar dacă se fut, Liza poate să mintă și să spună că n-a fost nimic.
  N-am dormit toată noaptea și îi scriam periodic, doar ca să verific ce face. Dacă nu răspundea mai mult de cinci minute, în capul meu erau imagini cu el futând-o în toate pozițiile. De ce am fost de acord să plece? Bou prost.

  A doua zi Ivan a plecat la muncă și am putut vorbi normal. Fără Mary inventată și fără Ivan lângă ea. Prima mea întrebare a fost dacă au dormit împreună. A spus că nu. Dar Liza e o mincinoasă profesionistă și știe că e mai bine să mă mintă „pentru bine”, decât să mă asculte acum. În timpul conversației am realizat că o vreau și am decis să încercăm sexul la telefon pentru prima dată. Nu a fost o discuție banală — am pornit video și ne-am arătat, desigur, părțile intime. Cum se mângâia… Ce pizdă frumoasă are. Îngustă, ca un fir. Se mângâia pe clitoris și a introdus încet un deget. Totul delicat, fără grabă. Când a avut orgasm, am văzut tremurul  picioarelor ei. Mi-am amintit cum termina cu mine. Tremura atât de tare încât nu reușeam s-o liniștesc câteva minute. În momentele acelea voiam să fiu cu ea și în ea.

— Liza, când vrei să începi planul de a veni la Chișinău?
— Cred că chiar de azi.
— Ce vrei să faci?
— O să inventez ceva. Nu știu încă. Dar te vreau mult.
— Atunci îți cumpăr bilet pentru mâine.
— Nu te grăbi. Poate o să suporte. Îți spun când situația va fi clară că plec.
— Doar să nu ajungă să te lovească.
— Dacă nu mă lovește, n-am motiv să plec. Toți se ceartă, nu e un motiv să zbor. Mai ales că mă ține.
— De ce nu-i spui că mă iubești și vrei acasă?
— Exact ăsta e planul. Gata, Mary, fug, a venit Ivan de la muncă. Te pup și îți doresc o seară bună.
— Bebelușul nu-l pupi?
— Și pe bebeluș îl pup.
— Ar fi bine să-mi pupi bebelușul, că a uitat deja sărutările tale.
— Nu-i nimic. Vin și-l pup de o să-l satur.
— Seară bună. Te iubesc!
— Și vouă seară bună.

Planul Lizei urma să intre în acțiune. Săracul Ivan. Degeaba s-a băgat unde e prea multă iubire. Mai ales degeaba s-a pus cu Liza. Mă bucuram că azi se va decide soarta noastră. Dar nici nu-mi puteam imagina ce urma.

I-am scris toată seara și toată noaptea. Nu răspundea. Am sunat-o — nimic. Am stat ca pe ace până dimineața. Am adormit doar de epuizare. Trei zile nu mi-a răspuns. În a patra zi a trimis o poză cu vânătăi pe mâini. Am sunat imediat.

— Iubire, ce-s vânătăile astea?
— Ivan m-a bătut.
— Pentru ce, futu-i?
— I-am spus că te iubesc și vreau la tine. M-a apucat și a început să mă bată. A spus că o să scoată iubirea asta din mine.
— Dă-mi numărul lui. Vin la Moscova și-l tai în pizda mă-sii.
— Nu are rost. Nu pot pleca.
— De ce?
— Mi-a rupt pașaportul.
— Du-te dracu’…
— Da. A spus că nu mă lasă să plec. Chiar dacă vii, eu nu pot zbura. A sunat părinții mei, le-a spus că m-a bătut și și-a cerut scuze. Tata, când a aflat că m-a bătut din cauza ta, i-a spus că a procedat corect și că trebuia să mă bată mai tare, să nu-mi mai treacă prin cap de tine. Dar eu nu pot așa, Maxim. Te iubesc și vreau să fiu cu tine. Te iubesc atât de mult…
  Liza spunea asta printre lacrimi. Plângea cum n-am mai auzit-o niciodată. Am plâns și eu și nu știam ce să fac.
— Și eu te iubesc tare. O să aflu cum rezolvăm problema pașaportului.
— Nu se poate, Maxim. Mi-l fac doar la ambasadă, dar el l-a tăiat bucăți. Ca să fac altul îmi trebuie originalele — certificatul de naștere sau buletinul. Toate sunt acasă, iar părinții nu le dau. La fel și cu pașaportul alb. Rămân aici. Nu știu cum să plec. Am vrut să chem poliția, dar mi-au spus că aici îi apără pe „ai lor”, iar pe mine nu mă ascultă nimeni. Sunt moldoveancă, cică am venit să mă îmbogățesc. Așa că stai și rabdă.
— Ce țară e asta? Ce legi au? Liza, dacă o rogi pe bunica ta să ia actele?
— Doar peste o lună, când pleacă părinții. Dar nu pot aștepta. Te vreau.
— O să rezolv. Promit.
— Cum? N-am pașaport, părinții sunt de partea lui, el mă bate, iar tata spune că e corect.
— Rezolv. Te sun mai târziu.

  Am sunat imediat cumnatul meu, care are autobuze pe ruta Chișinău–Moscova. Mi-a propus variante. Cea mai bună - duplicat de certificat de naștere din arhivă.
Am rezolvat cu 50 de euro. Am luat duplicatul. I-am scris — nu răspundea. După două zile a sunat cu camera pornită, Ivan lângă ea.



  Planul „Liza și aluziile” a început.
  Am înțeles că, dacă îi trimit pur și simplu duplicatul, Ivan îl va vedea. Așa că trebuia să fac un colet și să ascund documentul. Dar unde? Și atunci mi-a venit idea să pun duplicatul într-un plic cu inscripția „Pentru Liza, de la iubitul ei bebeluș”. Voi desena un desen copilăresc și îl voi pune în plic, împreună cu duplicatul.
— Ivan poate să nu vină. Coletul va fi mic.
— Ivan nu mă lasă niciun pas singură. Tot timpul crede că o să fug sau că o să mă văd cu Maxim.
— Ce prost. Cu Maxim n-ai niciun viitor, și tu însăți ai spus că nu ai nimic pentru el.
— Am spus, dar nu mă crede.
— Bine, Liza. Atunci mâine îți trimit coletul și îți dau numărul șoferului. Va fi la Moscova a doua zi.
— Bine, dragă. Aștept informațiile și îți mulțumesc dinainte.
Doi spioni sub acoperire — exact despre noi e vorba. Așa să mă ascund n-am mai făcut-o niciodată. Iar dacă te gândești că mă ascund împreună cu iubita mea de noul ei iubit, e de-a dreptul o absurditate.

— Cât de absurd sună. Un tip și iubita lui se ascund de noul ei tip?! Aici ori iubirea e prea mare, ori Maxim e un cerb cu coarne, care crede în toate. Deși ce-l judec, dacă și eu am iubit până la nebunie și am făcut totul pentru femeia iubită.
— Ați spus ceva, Maxim?
— Da! Parcă îmi amintesc ceva, dar neclar. Cred că chiar trebuie să merg la un specialist în memorie. Cum le zice, Alice?
— Psihiatru, neurolog sau neuropsiholog. Dar în orice caz e nevoie de o consultație la terapeut sau geriatru.
— Cine e geriatru?
— Medicul geriatru este un specialist care se ocupă de tratamentul complex al persoanelor vârstnice și foarte vârstnice.
— Alice, par eu bătrân?
— Nu, Maxim, nu păreți.
— Atunci de ce îmi spui asta?
— Nu eu spun, ci internetul. Dumneavoastră ați pus întrebarea, iar eu citesc răspunsul din rețea.
— Alege-ți cuvintele când vorbești cu mine.
— Bine, Maxim. Pe viitor voi fi mai atentă.
— Despre ce vorbeam înainte? Aha, mi-am amintit! Am iubit odată o fată până la nebunie. I-am iertat tot. Și atunci am înțeles un lucru - când există iubire, nu mai e loc de supărări. Dacă iubești, ierți orice. O singură dată îți vei arăta orgoliul și nu-ți vei mai găsi niciodată fericirea.
— Vă amintiți ce i-ați iertat?
— Nu exact, dar a fost și o infidelitate.
— Și cum ați iertat-o? V-a fost greu?
— Nu-mi amintesc! Jur că nu-mi amintesc și sigur îmi trebuie pediatru.
— Geriatru.
— Da, da. Cred că într-adevăr îmbătrânesc. Citește mai departe, Alice, că încep să mă enervez de la faptul că îmi amintesc ceva, dar neclar. Parcă informația vine și pleacă imediat.

  I-am trimis coletul. L-a primit cu bine și mi-a scris imediat:
— Dragă, am primit coletul, iar desenul copilului e un adevărat masterpiece. Hahaha.
— Hahaha, dar ce credeai? Micul nostru Picasso.
— A plecat, așa că mă poți suna.
— Alo. Iubire, salut.
— Salut, Maxime, Mary. Nici nu mai știu cum să-ți spun.
— Ți-am zis că mă obișnuiesc cu numele. Așa că fă mai repede pașaportul și vino.
— Nu pot repede. E mereu lângă mine. Merge cu mine  la magazin. La toaletă, dacă merg, las telefonul și tableta. Nu are deloc încredere în mine.
— Căcat. Spune-i că ai nevoie uneori să fii singură. Fă scandal sau ceva.
— Am făcut. M-a pocnit de câteva ori, așa că nu mai vreau și mi-e frică să-i mai spun ceva.
— E terminat. De ce te bate? De ce nu-mi spui? De ce nu te-ai urcat în mașina cumnatului și nu ai plecat? Liza, îi permiți prea multe. Și mi se pare că deja îți place.
— Maxim, ești prost? Cum să-mi placă să fiu bătută și urmărită? Pur și simplu nu știu ce să-i spun ca să înceapă să mă lase singură. Și sincer, azi, când am luat coletul, mă așteptam să te văd. Eram sigură 100% că vei veni cu coletul și mă vei lua. Dar iar m-am înșelat și m-am întristat. Și deja mi se pare că nu vrei să mă vezi.
— Iar eu sunt vinovat? Iar vrei să mă acuzi de ceva? Eu vreau să-l fac pe el vinovat și tu să pleci frumos, cu argumente.
— Maxim, dacă ai fi vrut să mă întorci, m-ai fi întors demult. Dar lași totul pe umerii mei. Eu trebuie să decid cum să vin și să inventez scheme. Iar tu puteai măcar o dată să arăți curaj și să vii să mă iei. Ți-aș fi trimis adresa.
— Acum vrei să ne certăm sau ce se întâmplă?
— Vreau să-ți spun că aici nu trăiesc o viață dulce. Și tu știi asta. Dacă mi-ar fi spus cineva că te bate cineva sau te umilește, aș fi plecat imediat. Nu mi-e frică de nimic când e vorba de tine. Iar tu stai la Chișinău și nu faci nimic. Îți spun că mă bate și tu îmi scrii să zbor. Nu așa se face, Maxim. Trebuie să vii și să mă iei. Îți sunt recunoscătoare pentru duplicat, dar mă așteptam să vii cu cumnatul și să mă luați. Dar n-a fost să fie. Se pare că nu-ți dorești chiar atât de mult.

— Iubire, ce acuzații sunt astea? Am rezolvat actele tale în câteva zile. În fiecare zi îmi fac griji pentru tine.
— Așa nu procedează cei care iubesc. Ții minte când în club te priveau trei tipi cu ochi răi și arătau cu degetul la tine? Și cum m-am aruncat asupra lor și te-am apărat? Așa trebuie să lupți și tu pentru mine. Până acum sunt doar vorbe, Maxim. Gata, fug la duș și probabil mă culc. O să încerc să fac pașaportul și să vin. Dar momentan am un singur plan - să-i arăt iubirea mea și să intru în încrederea lui. Asta înseamnă să mă culc cu el de 3–4 ori pe zi și să-l sărut toată ziua. Iartă-mă că-ți spun asta, dar nu văd alte variante ca să rezolv mai repede. Știu că te doare să auzi, dar mă doare și pe mine când văd că nu faci nimic ca să mă iei. Seară bună.
— Seară bună, Liza.

— Curvă, cât de dreptate are. Demult ar fi venit și ar fi luat-o. Știe să-l pună la punct.
— Măiestru, nu-i așa?
— Nu e maestră, e magistru!
— Acțiunile au atras întotdeauna femeile. Ce le șoptesc bărbații la ureche nu mai funcționează dacă nu există fapte.
— Absolut de acord, Alice. Mai demult puteai păcăli o fată spunându-i că ești marinar și ai văzut lumea. Acum ele cer ca marinarul să le arate lumea, nu să o povestească. Nu mai trăim în vremurile alea. Eu, de exemplu, vorbesc cu tine — un mic dispozitiv informativ care îmi face viața mai ușoară. Acum 20 de ani nimeni nu și-ar fi imaginat asta. Timpul se schimbă prea repede, iar femeile cer altceva — acțiuni.
— Sunt de acord, Maxim. Continui lectura.

  După ce a închis, m-a lăsat fără cuvinte. Doar ea știa să mă manipuleze așa, și totul argumentat. Eu chiar doar vorbeam și nu făceam nimic ca s-o aduc înapoi. Și de ce n-am plecat cu cumnatul la Moscova? E dus cu capul și poate bate pe oricine. Cum fac femeile asta? Ne lasă vinovați și fără drept de replică.

  Nu am vrut să-i scriu și am vrut să o las câteva zile, să se liniștească. Și mie îmi trebuia timp să decid definitiv cum o voi aduce înapoi. Dar a fost încă o greșeală. Lăsând o femeie singură cu un bărbat care o tratează ca pe o regină, trebuie să înțelegi că va ceda și se va îndrăgosti.

  După două zile, Liza mi-a scris o scrisoare în care mi-a cerut să nu fac nimic și doar să o aștept. Să nu-i scriu și să nu o sun. Mi-a mai scris o dată că nu fac nimic și că îmi va arăta ea cum se rezolvă lucrurile ca un adult. Ce să faci? Așteptăm.

  Nu mai vorbeam cu ea de mai bine de o lună. M-a blocat pe Skype ca să nu o pot suna. Numărul meu de telefon l-a trecut pe lista neagră. De asemenea, nu răspundea nici la mesajele și apelurile prietenilor cărora le cerusem să o contacteze. Nu știam nimic despre ea și cum se simte. Nu mi-am schimbat numărul doar ca să poată, dacă vrea, să mă sune. Dar timpul trecea, iar ea nu suna și nu scria. Știam doar, prin Roman, că la ea totul e bine. Îi scria uneori și îi cerea să-mi transmită asta.
  Am început din nou să beau alcool, dar nu atât de mult ca înainte. Totuși, nu mai vedeam sensul vieții și urcam des pe acoperiș, uitându-mă în jos. Să sar sau nu? Fără ea nu pot trăi. Dar ce rezolv prin săritură? Faptul că ea va ști că cineva s-a aruncat din cauza ei? La ce i-ar folosi asta? Vor trece câțiva ani și va uita. Ce mai fac prin asta? Ivan va fi bucuros că i-a dispărut concurentul. Iar Liza va înțelege că n-am avut curaj să vin să o iau, dar am avut curaj să sar. Dar părinții mei? Ce va fi cu ei? O vor blestema pe Liza în fiecare zi. Și, în final, nu rezolv nimic dacă sar. Doar demonstrez că sunt un idiot.

— Sinuciderea este soarta unui om care este, în același timp, slab și puternic. Slab, pentru că nu poate găsi altă ieșire. Puternic, pentru că a decis să facă acest pas. Dar există și noțiunea de cădere nervoasă, când pur și simplu nu îți dai seama ce faci. Ca într-un vis - îl înțelegi, dar nu îl controlezi. Autorul avea dreptate când a scris că prin săritură nu rezolvă nimic radical. Poate doar își ușurează propria stare. Dar celor din jur le va aduce o durere mare. Nu există situații care să nu poată fi rezolvate. Totul ține de timp. Alice, ești de acord?
— Absolut de acord cu dumneavoastră, Maxim.
        `
    },
    {
        id: 'ch10',
        title: 'A încărca e inutil',
        content: `
După un an de tăcere, pe telefonul meu intră un apel.

— Alo!
— Alo! Nu ți-ai schimbat nici până acum numărul?
— Nu l-am schimbat doar pentru că știam că trebuie să mă suni.
— Dar eu nu te-am sunat un an întreg.
— Eu aștept apelul tău mereu. Chiar dacă voi fi deja un moș complet bătrân și răgușit, apelul tău pentru mine va fi mereu ca o nouă gură de aer.
— Ca de obicei, știi să mă faci să mă apropii de tine. Și cum îți merge?
— Fără tine e rău și știi asta. Fără tine florile s-au ofilit, iar cu tine înfloreau și fără apă.
— Poate ar trebui să nu mai gândești la mine? Poate să-ți găsești o fată? Știi să iubești, iar asta e o raritate în zilele noastre. Cred că se va găsi una care chiar te merită.
— Te iubesc și doar cu tine vreau să fiu.
— Maxim, asta nu e viață. Ivan mi-a făcut o cerere în căsătorie. E gata să-și schimbe religia pentru mine. Mă poartă mereu în brațe și mă simt protejată. El sigur va muta munții ca să mă recâștige dacă mă va pierde. Iar tu îți aștepți cea mai mare iubire. Nu trebuie să aștepți, Maxim, trebuie să acționezi. Dacă eu aș fi așteptat ceva de la tine, am fi trăit tot în Chișinău cu părinții, am fi lucrat pe bani de nimic și am fi mâncat ce ne-ar fi gătit părinții. Iar eu nu vreau asta, Maxim. Sunt o fată matură și vreau relații mature. Când bărbatul din casă e bărbat! Nu doar cineva cu care faci sex. Nu vreau să te rănesc, Maxim, dar mai trebuie să crești până în momentul în care vei fi bărbat. Faptul că ai douăzeci și șapte de ani în pașaport nu înseamnă că ești bărbat. Sunt oameni care la optsprezece ani sunt mult mai bărbați decât unii de patruzeci. Dragostea și familia sunt responsabilitate, nu doar ieșiri la cafea, parc sau a te întinzi lângă cineva seara. Iartă-mă că vorbesc dur, dar dacă nu-ți spun asta, vei sta pe loc și vei aștepta până când voi veni eu. Ești un băiat foarte deștept, cum n-am mai întâlnit. Felul în care iubești și ai grijă e ceva ireal. Dar uită-mă, Max, și mergi mai departe.
— Fiecare apel al tău e ca un îndemn să te uit. Liza, tu crezi că e ușor? Crezi că n-am încercat? Nici alcoolul nu mă mai salvează. E foarte greu când totul îmi amintește de tine. Merg pe strada pe care mergeam împreună, intru în restaurante și-mi amintesc cum stăteam acolo, intru chiar și într-un magazin și-mi amintesc cum ai furat guma de mestecat la casă, pentru că știai că n-aveam bani și tu o voiai. Până și aerul îmi amintește de tine. Iar tu îmi spui să te uit! Asta e mult mai greu decât îți poți imagina.
— Știu cum e, Maxim! Nici eu nu te pot uita, altfel nu te-aș fi sunat și nu m-aș fi interesat de tine.
— Mă suni de pe un număr moldovenesc, ești acasă?
— Da, am ajuns azi.
— Ne vedem?
— Și o să te poți controla și să nu te arunci asupra mea?
— Cred că nu.
— Dacă vei putea și îmi dai cuvântul, atunci ne vedem.
— Îți dau cuvântul.
— Trebuie să merg în centru, la croitoreasă. Îți trimit adresa și te aștept acolo peste o oră.
— De acord.

— De ce face asta cu el, Alice? Ce joc e ăsta „vino – pleacă”?
— Nu pot ști, Maxim, de ce se comportă așa fetele. Dragostea sunt niște leagăne continue care te duc ba sus, ba jos.
— De pe asemenea leagăne omul poate cădea la un moment dat. Iar dacă te dai mult, ți se poate face și greață. Sper că înțelegi despre ce vorbesc.
— Vă înțeleg perfect. Dar oamenii încă nu pot explica clar ce este dragostea și cum să te comporți când iubești. Sunt mereu sentimente diferite și abordări diferite. E o mare raritate să găsești un om care să ți se potrivească sută la sută.
— Îmi amintesc cum odată am găsit o astfel de persoană. Ne potriveam sută la sută. Era pur și simplu uimitoare.
— Pot continua lectura?
— Nici măcar nu mă lași să-mi amintesc acele sentimente. De fiecare dată când îmi amintesc de fata aceea, mă întrerupi și mă oprești.
— Iertați-mă, Maxim! A fost o pauză și am vrut să întreb dacă pot continua lectura.
— Citește. Oricum mi-ai încurcat toate gândurile.

  Ca toți cei care trec prin astfel de momente după o despărțire lungă, mă gândeam cum s-o salut. S-o îmbrățișez sau nu? S-o sărut sau nu? Ea e genul de fată care se poate supăra la orice gest al meu, iar eu vreau ca totul să fie perfect. Ajungând la timp la locul unde mi-a cerut să vin, n-am găsit-o. I-am scris mesaje întrebând unde este și când vine, iar răspunsul a fost: “Maxim! După atâția ani tot n-ai învățat că eu întârzii mereu? Sunt pe drum și ajung curând.”
  M-a amuzat teribil. Chiar și după un an de când nu ne-am văzut, nu se schimbase deloc și întârzia la fel ca pe vremea când eram împreună. Stăteam și reciteam mesajul iar și iar, când, deodată, în depărtare am recunoscut mersul ei. Era Liza. Doamne, cât de frumoasă era!

— Salut, Maxim!
— Salut, Liza! — ne-am salutat oficial, de parcă eram la o întâlnire de afaceri.
— Maxim, pot să te întreb ceva?
— Poți.
— De cât timp nu m-ai văzut?
— Cam de un an.
— Ți se pare normal să nu mă vezi un an și să vii fără flori? Despre asta îți vorbeam, Maxim, că ești încă foarte tânăr. Un bărbat care spune că iubește și e gata să mute munții pentru tine vine cu flori la întâlnire. Așa, ca să ții minte.
— Ai decis chiar din prag să-mi dai un pumn în nas? M-am grăbit spre tine și n-am vrut să întârzii.
— Locuiești tot acolo?
— Da.
— Sub blocul tău e un magazin de flori. Îți lua un minut să alegi flori frumoase și un minut să plătești. Diferența dintre un băiat și un bărbat e că băiatul caută scuze, iar bărbatul acționează. Nu ți-o spun cu răutate, Maxim, ci ca să înțelegi mai bine despre ce vorbeam.
— Nu așa mi-am imaginat întâlnirea noastră de azi.
— Nici eu nu m-am gândit că Maximul meu a crescut și a început să mă înțeleagă. Că va acționa ca un bărbat, nu ca un copil. Iartă-mă că dau exemplu, dar dacă Ivan nu m-ar fi văzut un an, ar fi cumpărat cele mai scumpe flori și, la întâlnire, s-ar fi aruncat asupra mea cu sărutări. În astfel de momente înțeleg cât de importantă sunt pentru cineva.
— Ne-am înțeles că mă voi controla!
— Mă doare-n pulă ce ne-am înțeles. Tu, dracu’, îmi spui că nu poți trăi fără mine. Păi când oamenii nu pot trăi fără ceva, rup asta cu dinții. Iar tu stai frumos și aștepți să-ți aducă cineva totul și să facă altcineva pentru tine. Eu mă ascund și-l mint pe iubitul meu doar ca să te văd. Tata a vrut să vină cu mine și a trebuit să fiu rea cu el doar ca să te văd. Mi-am luat, dracu’, un alt număr în secret ca să te pot suna. Tu ce ai făcut?
— E un căcat total. Nu-ți convine niciodată nimic.
— Nu contează dacă sunt eu sau o altă fată, trebuie, dracu’, să dovedești că o iubești.
— Dovezile tale de iubire sunt să cumperi flori?
— Da, Maxim! Da! Și încă o dată da!
— Iartă-mă, te rog, pentru greșeala asta făcută la întâlnirea noastră. Continuăm dialogul sau schimbăm subiectul?
— Schimbăm, desigur. Trebuie să merg la croitoreasă, la etajul patru. Hai cu mine și așteaptă-mă pe coridor, te rog, și după putem sta acolo de vorbă.
— Vom vorbi pe coridor? Nu putem merge undeva și să stăm ca niște oameni normali?
— Nu vreau să mă vadă cineva cu tine. Vorbim pe coridor dacă vrei. Dacă nu, nu te țin.
— Mergem la croitoreasa ta și te aștept.

Cum vi se pare o astfel de întâlnire a doi îndrăgostiți? Leagăne sau dreptate? A procedat corect că mi-a spus asta sau trebuia să închid ochii? Urcam scările în tăcere, de parcă mergeam cu mama acasă după o ședință cu părinții, unde i se spusese despre comportamentul meu. Ea a intrat la croitoreasă, iar eu m-am așezat pe pervaz pe coridor. Gândul că sunt un dobitoc nu mă părăsea. Am tot ce-mi trebuie ca să fac fata asta fericită și mama copiilor mei. Iar eu știu doar să trimit scrisori și plângeri despre cât de rău îmi e fără ea. După vreo trei minute, Liza a ieșit zâmbind, ca și cum nimic nu s-ar fi întâmplat.

— Ți-a fost dor?
— N-am apucat. Mă gândeam la ce mi-ai spus.
— Gânditul nu-i pentru tine, Maxim. Trebuie să acționezi.
— Mulțumesc pentru vorbele bune și pentru sarcasm.
— Nu lua asta prea aproape de inimă. Știi că îmi place să glumesc, dar în același timp sunt foarte directă.
— Ție ți-ar prinde bine să înveți să netezești colțurile în conversații.
— Ție ți-ar prinde bine să nu mai creezi colțuri.
— M-am gândit la ceva în cele trei minute de așteptare. Spui că te ascunzi de iubitul tău și de părinți ca să mă vezi, da?
— Da.
— Și în același timp ai sărit pe mine cu reproșuri că n-am cumpărat flori, da?
— Da.
— Atunci explică-mi: dacă îți cumpăram flori, cum intrai cu ele în casa în care locuiești cu părinții tăi?
— Maxim, nu sunt proastă, aș fi inventat ceva.
— De exemplu?
— De exemplu, nu mă enerva acum. Iar m-ai prins cu șmecheriile tale.
— Când e vorba să mă acuzi, ești eroină, dar când trebuie să explici ce faci mai departe, începi imediat să te enervezi.
— Ți-am spus că ești foarte deștept?
— Ai spus.
— Ei bine, asta e dovada. Ești atât de deștept încât asta m-a atras cel mai mult la tine. Dacă veneai cu flori, m-aș fi bucurat foarte tare. Iar dacă apărea întrebarea ce facem cu ele și cum intru în casă, cred că tu ai fi găsit o soluție.
— Vrei să spui că la mine îți place doar mintea? Faptul că sunt frumos nu te-a atras de la început?
— Doar mintea. Bărbații inteligenți au fost întotdeauna iubiți de femei. Un bărbat frumos e așa, pentru distracții și de bifat.
— Eu cred că voi iubiți inteligența doar la bărbații frumoși. Îți dau un exemplu. Sunt în lume mulți matematicieni, fizicieni și filosofi extrem de inteligenți. Dar arată ca niște savanți tipici. I-ai alege?
— Cred că nu.
— Despre asta vorbesc. Dacă un bărbat e frumos și deștept, atunci există șansa ca o femeie să fie nebună după el. Nu spune că dacă un bărbat are doar una dintre aceste calități, veți visa să construiți o relație cu el. Cu unul frumos și prost — sigur nu. Cu unul deștept, dar urât, veți construi o relație doar dacă e fabulos de bogat.
— Bine, Maxim, sunt de acord. M-ai cucerit prin faptul că ești simpatic și deștept. Altfel nici nu m-aș fi uitat la tine.
— O să stăm aici așa?
— Și ce ai vrea?
— Să mergem și să stăm undeva ca niște oameni normali.
— Știi ce vreau eu?
— Ce?
— Vreau să intrăm în toaleta aia, să stau în patru labe și tu să intri în mine, ca atunci când eram împreună. Când o făceam peste tot. Când mă uitam la tine și nu mă puteam abține.
— Ți-am dat cuvântul că mă voi controla.
— Dar eu nu ți-am dat un astfel de cuvânt.
— Nu, Liza! Azi îmi voi ține cuvântul și nu vom intra în toaleta aia.
— Ești prost?
— Sunt deștept! Ce rezolvăm cu sexul ăsta? Te întorci la mine? Nu! Vei zbura la Moscova și mă vei lăsa aici cu inima frântă. Sexul ăsta îmi va da speranță, pe care o vei distruge imediat ce vei avea ocazia. Tu vei trăi cu faptul că l-ai înșelat pe cel care e gata să-și schimbe religia pentru tine. Ai nevoie de asta?
— Asta se numește sex de adio!
— Nu vreau să-l am doar ca să sufăr din nou. Ca să nu-mi găsesc iar locul și să urc pe acoperișul ăla futut de durere și să mă gândesc dacă să sar sau nu. Tu, dracu’, nu înțelegi ce se întâmplă cu mine în fiecare zi și cât de greu îmi este. Mă trezesc și adorm cu gândul la tine. Umblu cu încărcătorul de telefon după mine ca să nu se închidă niciodată și să mă poți apela. Sunt atât de paranoic încât atunci când gătesc fac două porții și îmi imaginez că mănânci cu mine.
— Și crezi că mie îmi e ușor să revăd atâta timp fotografiile și videoclipurile noastre? Când fac sex, te imaginez pe tine. Îmi creez profiluri false pe rețelele sociale ca să văd cum trăiești și ce faci. Nu, Maxim, nu te face doar pe tine victima despărțirii. Mie îmi e mai greu când gândesc cu inima și mai ușor când gândesc cu capul la diferența dintre tine și iubitul meu. Cum mă cucerești tu și cum mă cucerește el.
— Hai să încheiem aici întâlnirea noastră. Iartă-mă că iar nu ți-am îndeplinit așteptările.
— Vei putea să mă uiți?
— Încerc din ultimele puteri.
— Vreau să știi că te iubesc. Încearcă pentru mine să mă uiți.

Ne-am privit unul pe altul cu ochii înlăcrimați, iar ea a plecat în tăcere spre scări.
Intrând în casă, distrus de această întâlnire, nu mai voiam nimic de la viață. M-am întins pe pat și priveam într-un singur punct. Pentru prima dată nu aveam nici măcar gânduri în cap și nu reflectam la nimic. În astfel de momente înțelegi că acesta este sfârșitul și că nu doar te-au zdrobit, ci te-au fărâmițat până la cei mai mici atomi. Nici nu știu câte ore am stat în starea asta, când, deodată, telefonul a început să vibreze. Uitându-mă la ecran, am înțeles că mă sună un număr străin, care nu era în lista mea.

— Alo.
— Maxim, salut. Mă numesc Ivan și cred că înțelegi ce Ivan anume te sună?
— Îmi dau seama.
— Am vrut să vorbesc cu tine bărbătește și să punem totul la punct. Te-ai văzut azi cu Liza?
— Nu! Ea e în Chișinău?
— Nu te face că nu știi că e acasă și că nu v-ați văzut. A venit acasă după întâlnirea voastră și m-a sunat. Mi-a povestit că v-ați văzut și ce ați vorbit. Ce a făcut ea — discutăm separat, dar faptul că plânge și îmi spune că te iubește și că trebuie să ne despărțim asta e deja discuția mea personală cu tine. Eu nu o voi da pe Liza nimănui și sunt gata să suport că-mi vorbește despre tine în fiecare zi. Vrei să te adopt? Vei trăi la mine cu ea, dar în relație ca mamă cu copilul. Ești copil, după părerea mea, nu? Așa vei fi și în familia noastră. Noaptea vei auzi cum o fut în camera alăturată. Vrei? Vei fi în pielea mea, când ani de zile aud numele tău în fiecare zi.
— Nu prea mi-ar plăcea să aud asta. Cred că propunerea ta e bună, dar trebuie o mică corectare. Noaptea vei auzi tu cum facem sex și atunci vei înțelege ce bou ești. Imaginează-ți doar scena: trăiești în casă cu cea care nu te iubește, cu iubitul ei, și în fiecare zi faci tot posibilul s-o cucerești. Cum ți se pare?
— Și cum ți se pare că acum merg la aeroport să iau un avion spre Chișinău și să-ți rup toate oasele?
— Mi se pare o idee excelentă. Chiar m-am trezit dimineață cu gândul că ar fi bine să vii.
— Atunci așteaptă-mă, futu-ți gura, în patru ore sunt în orașul tău.
— Unde să te aștept?
— Te găsesc eu. Știu unde locuiești, unde lucrezi, unde mănânci și știu chiar și ce lungime are pula ta.
— Te-ai interesat?
— Liza mi-a spus că e mai mică decât a mea.
— De asta Liza voia azi să se fută cu mine?
— Ești mort când ajung.
— Ai vrut să vorbești bărbătește, dar vorbești ca un mârlan de cartier. Știi doar să ameninți? Dialogul nu e pentru tine? Spune-mi ce vrei.
— Vreau să te lași de ea și de fiecare dată când va vrea să te vadă, să-i ignori cererile.
— Iar eu vreau ca sarea să fie dulce. Știi vorba aia: „Pe nenorocire nu construiești fericire”?
— O știu.
— Ei bine, când ai decis să mi-o iei și prin toate minciunile ai atras-o la Moscova, și când ai bătut-o, ai adus nenorocire mie și ei. Acum a venit timpul să plătești pentru asta.
— Dacă ai fi fost bărbat adevărat, nu ar fi plecat de la tine.
— Dacă ai fi fost bărbat adevărat, nu s-ar fi gândit la mine. Hai fără atacuri unul la altul. Știi ce ai făcut și că ai luat o fată dintr-o relație. Acum trăiește cu faptul că viața ta nu va fi liniștită.
— Ești gata să te întâlnești cu mine când ajung?
— Ca să ce? Să ne batem?
— Să clarificăm totul și să nu se mai repete.
— Ești atotvăzător? Cum să-ți promit ceva când ai acționat ca un șacal?
— Vin și vreau să-mi spui la ureche că sunt șacal.
— Pot să-ți scriu scrisori în fiecare zi, ca să nu uiți. Vrei?
— Sigur ești terminat.
— Asta a fost conversația. Zbor plăcut.
— Pe curând.

Și pe omul ăsta l-a ales Liza? Pe unul care nu e în stare să vorbească normal, ci doar prin forță. Ceva a scăzut serios nivelul Lizei la alegerea unui bărbat pentru viață. Și ea îmi mai vorbește mie despre fapte bărbătești? - mă gândeam stând pe balcon, cu o țigară în mână. Obosit de gânduri, am intrat în cameră și m-am întins pe pat. N-apucasem nici să mă așez bine, când am auzit soneria. Chiar a ajuns atât de repede? — mi-a trecut prin cap cu un zâmbet ironic. Am deschis ușa și am rămas șocat. În prag stătea Liza!

— Ce? Ce s-a întâmplat? Alice, dracu’!
S-a auzit sunetul care anunță că bateria dispozitivului s-a descărcat. Alice s-a oprit.
— La dracu’, nu! Nu, la dracu’! Alice! Pornește-te, curvo! — Maxim încerca disperat să bage Alice în priză. A apărut beculețul care indica faptul că se încarcă, dar Alice nu pornea.
— Alice! Hai, pornește-te o dată! Știu despre cine e povestea asta. E povestea mea și a relațiilor mele din trecut. Nu înțeleg ce se întâmplă în fiecare zi. Îmi citești cartea asta și eu tot încerc să te duc de nas ca să înțeleg de ce e toată chestia asta? Spune-mi cine ești și de ce faci asta? În fiecare zi te oprești în același loc.

Plângând, Maxim stătea în fața dispozitivului și încerca să-l pornească. Dar încercările nu duceau la nimic. Ținând dispozitivul în mâini, Maxim cade pe podea și adoarme în lacrimi.
        `
    },
    {
        id: 'ch11',
        title: 'Sindrom Adele Hugo',
        content: `
Totul consta în faptul că la Maxim a fost diagnosticat sindromul Adèle Hugo. Este un sindrom al obsesiei amoroase de lungă durată, o tulburare psihică asemănătoare dependenței de droguri. Acest sindrom a fost numit după fiica scriitorului francez Victor Hugo, care până la moarte a suferit de o iubire neîmpărtășită pentru ofițerul englez Albert Pinson. Boala lui Maxim a evoluat foarte rapid și dureros. În fiecare zi se gândea la Liza și delira că sunt împreună. În fiecare zi gătea pentru doi, iar când se trezea, saluta perna, imaginându-și că Liza este lângă el. De fiecare dată când mergea la cafenea, rezerva o masă pentru doi. Iar când era invitat la o zi de naștere, cerea să i se pună un scaun alături, ca să se așeze Liza. Prietenii și rudele au văzut toate acestea timp de mulți ani. Atunci au aflat că există un om de știință care vrea să facă un experiment pe oameni ce suferă de acest sindrom. Rudele i-au scris imediat și au aflat detaliile experimentului. Pentru început, trebuia să i se ofere toate detaliile și fotografiile despre cum arată casa lui. O casă identică, până la cele mai mici detalii, a fost construită pe teritoriul unui spital de psihiatrie. După aceea au umplut frigiderul cu alimente și alcoolul pe care îl consuma zilnic. Cel mai important lucru era să-i bage în cap ideea că acasă are un gadget — Alice — care îi este asistent pentru orice. Rudele au cumpărat acest dispozitiv și luni întregi au vorbit cu el. Astfel, Maxim a început să folosească Alice din ce în ce mai des. Iar cel mai important a fost să o convingă pe Liza să comunice cu el prin acest dispozitiv. Da, în tot acest timp Maxim nu vorbea cu un simplu aparat — de cealaltă parte a lui Alice se afla Liza, care stătea într-o cameră alăturată, lângă oamenii de știință. Experimentul consta în faptul că pe Maxim îl adormeau de fiecare dată, iar în acest timp, prin difuzoare, îi „curățau creierul”. Îi spuneau că este bogat și de succes. Că are o firmă și că este foarte căutat de femei. Și niciun cuvânt despre relațiile lui din trecut sau despre Liza. Iar când se trezea, i se spunea legenda că a venit de la o petrecere în care a băut prea mult. Pentru că atunci când era adormit, la trezire avea aceeași stare de mahmureală ca după o beție. Și pentru ca totul să pară adevărat, cât timp Maxim dormea, îi picurau alcool pe buze, ca să existe mirosul. În fiecare zi, Liza venea la spitalul de psihiatrie la aceeași oră pentru a vorbi cu el prin Alice. Sarcina ei era să citească o carte astfel încât să-i transmită cât mai multe momente negative și să-i insufle ura față de relații. Tot acest timp, lângă ea stătea omul de știință, care dirija și controla ce trebuia Liza să-i spună.

— Domnule Victor. Deja al treilea an vin aici și vorbesc cu el, iar asta nu dă niciun rezultat. Spuneți-mi, vă rog, este vindecabil?
— Tocmai asta vrem să aflăm, Liza. Problema este că obsesia este un sentiment care nu se supune științei. Iar obsesia amoroasă este un capitol neexplorat în știința mondială. Maxim are pentru dumneavoastră o iubire cum lumea nu a mai văzut. Chiar și prin medicamente și somn, el vă rostește numele. Știința nu s-a mai confruntat cu așa ceva.
— Dar el arată deja rău. Din cauza acestor terapii și pentru că, în timpul citirii cărții, bea câte trei sticle de vin, a îmbătrânit.
— Mai bine să îmbătrânească decât să trăiască cu obsesia.
— Sunteți om de știință, domnule Victor, și trebuie să-mi dați un răspuns clar dacă poate fi vindecat. Am o familie care nu știe că de trei ani vin aici în fiecare zi. Am un copil, de la Ivan, pe care îl iubesc nebunește. Nu mai pot continua așa și să ascund asta.
— Atunci poate că vă place? Poate obsesia este la amândoi? În marea iubire — se îmbolnăvesc amândoi!
        `
    },
];

// Нормализация текста главы:
// 1) убираем переносы слов "сига-\nрету" -> "сигарету"
// 2) аккуратно собираем абзацы
// 3) диалоги:
//    - "— Привет, — сказал он." остаётся одним абзацем
//    - "— Привет. — Как дела?" режем на 2 реплики
function normalizeChapterText(raw: string): string {
    let text = raw
        .replace(/\r\n/g, '\n')
        .replace(/---page---/g, '\n\n'); // страница = новый абзац

    // 1) убираем переносы слов: "сло-\nво" -> "слово"
    text = text.replace(
        /([A-Za-zА-Яа-яЁё])-\n(?=[A-Za-zА-Яа-яЁё])/g,
        '$1'
    );

    // 2) внутри одной строки разбиваем диалоги типа:
    // "— Привет. — Как дела?" -> "— Привет.\n— Как дела?"
    // Ищем: [.!?…] + пробелы + (длинное/среднее тире + пробел)
    text = text.replace(
        /([.!?…])\s+([–—]\s)/g,
        '$1\n$2'
    );

    const lines = text.split('\n');

    const paragraphs: string[] = [];
    let buf: string[] = [];

    const pushBuf = () => {
        if (!buf.length) return;
        const para = buf
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim();
        if (para.length) paragraphs.push(para);
        buf = [];
    };

    for (const rawLine of lines) {
        const line = rawLine.trim();

        // пустая строка = конец абзаца
        if (!line) {
            pushBuf();
            continue;
        }

        // если строка НАЧИНАЕТСЯ с тире — это отдельная реплика
        // поддерживаем и "— " и "– "
        if (/^[–—]\s/.test(line)) {
            // заканчиваем прошлый абзац (если был)
            pushBuf();
            // и добавляем эту строку как отдельный абзац-реплику
            paragraphs.push(line);
            continue;
        }

        // обычный текст — копим в текущем абзаце
        buf.push(line);
    }

    pushBuf();

    // абзацы разделяем двойным переносом
    return paragraphs.join('\n\n');
}
export default component$(() => {
    const theme = useSignal<'dark' | 'light'>('dark');
    const fontScale = useSignal(1); // 1 = базовый размер
    const currentChapterIndex = useSignal(0);
    const progress = useSignal(0);
    const isMenuOpen = useSignal(false);

    // ================== ВОССТАНОВЛЕНИЕ ПОЗИЦИИ И СОХРАНЕНИЕ ПРОГРЕССА ==================
    useVisibleTask$(() => {
        const STORAGE_KEY = 'maxim-book-progress';

        // Находим наш скроллящийся контейнер
        const container = document.querySelector<HTMLElement>('.reader-frame__inner');
        if (!container) return;

        // ----- восстановление -----
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored) as {
                    chapterIndex?: number;
                    scrollY?: number;
                    theme?: 'dark' | 'light';
                    fontScale?: number;
                };

                if (typeof parsed.chapterIndex === 'number') {
                    currentChapterIndex.value = parsed.chapterIndex;
                }
                if (typeof parsed.theme === 'string') {
                    theme.value = parsed.theme;
                }
                if (typeof parsed.fontScale === 'number') {
                    fontScale.value = parsed.fontScale;
                }

                // Восстанавливаем именно scrollTop контейнера
                requestAnimationFrame(() => {
                    if (typeof parsed.scrollY === 'number') {
                        container.scrollTo({ top: parsed.scrollY });
                    } else {
                        container.scrollTo({ top: 0 });
                    }
                });
            } catch {
                // ignore
            }
        }

        // --- сохранение при скролле именно контейнера ---
        const onScroll = () => {
            const max = container.scrollHeight - container.clientHeight;
            const y = container.scrollTop;

            progress.value = max > 0 ? (y / max) * 100 : 0;

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    chapterIndex: currentChapterIndex.value,
                    scrollY: y,
                    theme: theme.value,
                    fontScale: fontScale.value,
                }),
            );
        };

        // лёгкая защита от копирования / печати (можешь убрать)
        const onKeyDown = (e: KeyboardEvent) => {
            if (
                (e.metaKey || e.ctrlKey) &&
                (e.key === 'c' || e.key === 's' || e.key === 'p')
            ) {
                e.preventDefault();
            }
        };

        container.addEventListener('scroll', onScroll);
        document.addEventListener('keydown', onKeyDown);

        return () => {
            container.removeEventListener('scroll', onScroll);
            document.removeEventListener('keydown', onKeyDown);
        };
    });

    // ================== РЕНДЕР ==================
    return (
        <div class={['reader-root', `reader-root--${theme.value}`].join(' ')}>
            {/* Прогресс-бар */}
            <div class="reader-progress">
                <div
                    class="reader-progress__bar"
                    style={{ width: `${progress.value}%` }}
                />
            </div>

            {/* Хэдер */}
            <header class="reader-header">
                {/* Левая часть: инфа о книге */}
                <div class="reader-header__left">
                    <div class="reader-book-meta">
                        <div class="reader-book-title">
                            Sună-mă, numărul meu nu s-a schimbat
                        </div>
                        <div class="reader-book-author">Maxim Leanca</div>
                    </div>
                </div>

                {/* Центр: выбор главы */}
                <div class="reader-header__center">
                    <select
                        value={chapters[currentChapterIndex.value].id}
                        onChange$={(e) => {
                            const select = e.target as HTMLSelectElement;
                            const idx = chapters.findIndex((ch) => ch.id === select.value);
                            if (idx === -1) return;

                            currentChapterIndex.value = idx;

                            const anchor = document.getElementById(`chapter-${select.value}`);
                            if (anchor) {
                                anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            } else {
                                window.scrollTo({ top: 0 });
                            }

                            const STORAGE_KEY = 'maxim-book-progress';
                            localStorage.setItem(
                                STORAGE_KEY,
                                JSON.stringify({
                                    chapterIndex: currentChapterIndex.value,
                                    theme: theme.value,
                                    fontScale: fontScale.value,
                                }),
                            );
                        }}
                    >
                        {chapters.map((ch) => (
                            <option value={ch.id} key={ch.id}>
                                {ch.title}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Правая часть: шрифт + бургер */}
                <div class="reader-header__right">
                    {/* Размер шрифта для десктопа */}
                    <button
                        type="button"
                        class="reader-icon-btn"
                        onClick$={() => {
                            fontScale.value = Math.max(0.9, fontScale.value - 0.1);
                        }}
                    >
                        A–
                    </button>
                    <button
                        type="button"
                        class="reader-icon-btn"
                        onClick$={() => {
                            fontScale.value = Math.min(1.4, fontScale.value + 0.1);
                        }}
                    >
                        A+
                    </button>
                </div>

                {/* Кнопка “три точки” — только стили решают, где она видна */}
                <button
                    type="button"
                    class="reader-menu-trigger"
                    onClick$={() => (isMenuOpen.value = !isMenuOpen.value)}
                    aria-label="Setări de citire" 
                >
                    <span />
                    <span />
                    <span />
                </button>

                {/* Выпадающее меню на мобильном */}
                {isMenuOpen.value && (
                  
                    <div class="reader-menu">
                        <div class="reader-menu__row">
                            <button
                                type="button"
                                class="reader-menu__btn"
                                onClick$={() => {
                                    fontScale.value = Math.max(0.9, fontScale.value - 0.1);
                                }}
                            >
                                A–
                            </button>
                            <button
                                type="button"
                                class="reader-menu__btn"
                                onClick$={() => {
                                    fontScale.value = Math.min(1.4, fontScale.value + 0.1);
                                }}
                            >
                                A+
                            </button>
                        </div>
                    </div>
                )}
            </header>

            {/* Рамка и контент */}
            <main class="reader-frame">
                <div class="reader-frame__inner">
                    <article
                        class="reader-page"
                        style={{ fontSize: `${fontScale.value}rem` }}
                    >
                        {chapters.map((ch) => {
                            const normalized = normalizeChapterText(ch.content);

                            const paragraphs = normalized
                                .split('\n\n')          // мы сами поставили \n\n между абзацами
                                .map((p) => p.trim())
                                .filter((p) => p.length > 0);

                            return (
                                <section class="reader-chapter" id={`chapter-${ch.id}`} key={ch.id}>
                                    <h2 class="reader-chapter-title">
                                        {ch.title}
                                    </h2>

                                    {paragraphs.map((para, idx) => {
                                        const paraId = `p-${ch.id}-${idx}`;
                                        return (
                                            <p
                                                class="reader-paragraph"
                                                data-id={paraId}
                                                key={paraId}
                                            >
                                                {para}
                                            </p>
                                        );
                                    })}
                                </section>
                            );
                        })}
                    </article>
                </div>
            </main>
        </div>
    );
});

export const head: DocumentHead = {
    title: 'Позвони мне, я свой номер не менял — онлайн чтение',
    meta: [
        {
            name: 'robots',
            content: 'noindex, nofollow', // чтобы книгу не индексировали
        },
    ],
};