var randrange = function (bottom, top) {
    return Math.floor(Math.random() * ( 1 + top - bottom )) + bottom;
}
var game = false;
var temp_this; //for jQuery
var audio_play = false;
var morse_kood, pList, sona, closed_count;
var vead = 0;
var arvatav_sona = '';
var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var sonad = ['kasutusvalmis', 'osaobjekt', 'aastaringselt', 'tselluloosieeter', 'kummivaik', 'vurrudega', 'valutundetus', 'kergitama', 'eelnes', 'naelutama', 'ilmekus', 'kefaalne', 'karakter', 'naabrus', 'refleksiivpronoomen', 'paljundamine', 'trakt', 'intelligendike', 'autotreiler', 'skelett', 'kaubareisija', 'kappiste', 'fotorakk', 'pahakspandamatu', 'kalts', 'tromb', 'puiklev', 'kellu', 'feodaalkord', 'uurimata', 'punnis', 'abielurikkuja', 'tervistav', 'viljastatud', 'plagisti', 'kaubanduskoda', 'armukadedalt', 'peatee', 'kolm', 'dividend', 'mustkala', 'tapatalgud', 'lindistama', 'silutud', 'jutuvestja', 'kompost', 'epakus', 'laineala', 'vastanduv', 'germaani', 'proteiin', 'muutuse', 'komplitseeritud', 'vankudes', 'tagasiastumine', 'hiidsajajalgne', 'geopoliitiline', 'laiendatud', 'rahvusvaheline', 'varitekk', 'popeliin', 'rikkus', 'eosoikum', 'kurelised', 'koaksiaalkaabel', 'rihm', 'liikumatus', 'elementaarne', 'luminestsents', 'kahju', 'kantiaanlik', 'koonlapuu', 'pandis', 'liisuma', 'puurija', 'piljardikii', 'jansenism', 'andalusiit', 'uljustamine', 'libertarism', 'diskvalifitseerima', 'vastav', 'maikelluke', 'jommis', 'delfiinlased', 'eksemplarrefleksiivne', 'tara', 'haledalt', 'lastima', 'tulepaak', 'konteinerilaev', 'taltunud', 'kibedalt', 'eriala', 'korsika', 'magnetjuhe', 'aadlik', 'granuleeritud', 'koan', 'tupsutama', 'liiasusevaba', 'kohvipaks', 'kommertspank', 'armastus', 'taktitu', 'toiduotsing', 'kolhoosnik', 'kaasinimene', 'kasarmu', 'jubedus', 'adopteerimisvahendaja', 'ammendamine', 'esmaabipaun', 'bulatt', 'nohu', 'rihtimine', 'hipikultuur', 'destillaator', 'pliioksiid', 'kohmakus', 'andesiit', 'rekapitaliseerima', 'connecticutlane', 'portaalkraana', 'lavendlivesi', 'ajatempel', 'pleonasm', 'arusaamatus', 'viivitaja', 'toetusfond', 'presstubakas', 'tagasikohkumine', 'nahkhiirlased', 'kannusoojendaja', 'keskkomitee', 'intensiivkursus', 'staatiliselt', 'kriminaalkaristus', 'loovutatud', 'ksantaadid', 'homofoob', 'kromosoomistik', 'laevapoiss', 'majesteedisolvamine', 'melanoos', 'kristallograaf', 'teadmishimuline', 'pahaendeline', 'alati', 'maskuliinsus', 'loomalikult', 'naerikujuline', 'barbariseerima', 'ihnuskoi', 'voluntarist', 'mahv', 'pisar', 'postfiks', 'valgustaja', 'kasutuses', 'altkulmupilk', 'mastodon', 'seadmed', 'savisete', 'kihluma', 'galantsus', 'monomaan', 'abielumehelik', 'tasakaalutus', 'oiatus', 'heinavanker', 'tuulepoolne', 'igikestvus', 'ministeerium', 'riigitruudus', 'vahune', 'krookima', 'egalitaarne', 'kanalisatsioonikaev', 'askeldama', 'semiootik', 'poolikult', 'kardiograafia', 'taasavama', 'tahumatus', 'keraslill', 'toiduta', 'kivimiteadus', 'tahvelkivi', 'seotus', 'vokk', 'haigevoodis', 'mittekohustuslik', 'tsefeiid', 'pundumine', 'aruandekohustus', 'relativism', 'edutu', 'lamellid', 'meiootiline', 'tohter', 'videosagedus', 'tempo', 'peilima', 'arvutustabelid', 'pauperisatsioon', 'maksevahend', 'otsesus', 'elektroteraapia', 'parapett', 'kummipuu', 'kreen', 'impregneerimine', 'lunasaadetis', 'kommete', 'neogeen', 'triikima', 'omadus', 'militarism', 'tagastus', 'surmkahvatu', 'reaalkool', 'tuluke', 'sarnaselt', 'teurgiliselt', 'joonspekter', 'server', 'lohvitamine', 'lebra', 'sirm', 'vastandpoolus', 'raadiotelegraafia', 'genealoogia', 'alusetult', 'sportima', 'lihvima', 'riigikassa', 'pliiatsiteritaja', 'alarmkell', 'abrakadabra', 'treipink', 'halvaendeliselt', 'abonement', 'ennustamine', 'sukelkeetel', 'kvantifitseerimine', 'turupiirang', 'laevaoherdi', 'ekskursant', 'mahajaana', 'plaatan', 'lott', 'elukutseline', 'aplus', 'autopiloot', 'sajakas', 'joom', 'foiniiklane', 'praostkond', 'krohvija', 'briljantiin', 'tehnikum', 'gerundium', 'permuteerima', 'startima', 'antikreatsionism', 'risti', 'proportsionaalsus', 'eelvalimised', 'ristikuleht', 'poliitiline', 'endokrinoloogia', 'protestantism', 'klaitoonia', 'arusaaja', 'autopesu', 'statist', 'akvatoorium', 'blasar', 'rammetu', 'fiktsioon', 'homoabielu', 'sumbuv', 'tulvama', 'juhitamatult', 'intelligentsustest', 'viigiseis', 'majutamine', 'kombeline', 'habemeajamine', 'poolroomik', 'kordon', 'jogurt', 'armunud', 'auliige', 'strontsianiit', 'biitnik', 'veisekarjus', 'lausung', 'angoora', 'statuett', 'tuulamine', 'pantomiimikunstnik', 'leinamissa', 'parandaja', 'soomusplaat', 'teaduskond', 'konsignaator', 'purist', 'paks', 'lastivahetekk', 'beduiin', 'rookimisnuga', 'omistusseadis', 'leevendusvahend', 'geostatsionaarne', 'kookima', 'ausus', 'lennukilt', 'radarpeegeldi', 'keskkonnareostus', 'artikulatoorne', 'udarasisene', 'kolmekordistama', 'asiaat', 'netopalk', 'abil', 'hoiustama', 'taht', 'takistav', 'valitsusala', 'kannustatud', 'pandan', 'kasarmud', 'reaktiivliikumine', 'itsitama', 'surmatunnistus', 'solvumine', 'vastavuses', 'lahkelt', 'paisunud', 'tiibhoone', 'asendamaks', 'silinderjas', 'tulenema', 'tontlikkus', 'ekstsentrik', 'taltsutama', 'sundimatu', 'veskitiib', 'angliseerimine', 'nupus', 'elektrokardiogramm', 'liig', 'vigasus', 'kaminasimss', 'galaatlane', 'kuplett', 'sideeriline', 'antoloog', 'sametpehme', 'videolint', 'esmaklassiline', 'kavandamine', 'resoneerima', 'pudelikiri', 'personaliotsingufirma', 'paaritamine', 'hellenistlik', 'brausimine', 'absolutistlik', 'immuunsus', 'karvake', 'kurtisaan', 'hambakivi', 'ratsapolitsei', 'emakompass', 'leivakarp', 'ebadelikaatsus', 'trotsima', 'salastatud', 'vest', 'pardapuu', 'polaroidprillid', 'rookatus', 'veeliin', 'lehmapidamine', 'hulgafunktsioon', 'nurgaapteeker', 'transkribeerima', 'kasutusvaldus', 'andmetel', 'eikeegi', 'energiaallikas', 'jahtumine', 'patriits', 'optimistlik', 'perikardiit', 'rabatult', 'vedelik', 'kittel', 'kanal', 'kamikaze', 'aianduslikult', 'nimekaim', 'fungitsiidne', 'elulookirjeldus', 'isomeetriline', 'kooperaator', 'ammendama', 'parvepoiss', 'perioodilisustabel', 'alalisvool', 'ruumikas', 'helmetaoline', 'maakas', 'patriootlik', 'natsi', 'lehmad', 'alajaotus', 'lohutamatult', 'fossiilne', 'vagunelamu', 'giid', 'autriger', 'altruist', 'keldrirestoran', 'emeriitprofessor', 'korpuskul', 'patsient', 'tihendusmasin', 'mikstuur', 'piilumine', 'mulgutangid', 'karbiid', 'teeklaas', 'kilokalor', 'klimatoloogia', 'koni', 'orwelli', 'elektrikitarr', 'juudasuudlus', 'puur', 'looklema', 'rebukork', 'platvormvagun', 'valeraha', 'vannivaht', 'semulik', 'oletavalt', 'kammeljas', 'kromoteraapia', 'valikuaksioom', 'reformipoliitika', 'siseveed', 'laenutaja', 'laskemoonakamber', 'allveediversant', 'tegevuskasum', 'klaasigraveerija', 'brahmanism', 'edasiminek', 'kirjakraad', 'taskulamp', 'kateeterdama', 'turustusosakond', 'arvutusmasin', 'kuumarabandus', 'sulataja', 'washingtonlane', 'kasahh', 'tellised', 'tuhmunud', 'doktorikandidaat', 'jura', 'evenk', 'loodesse', 'teatama', 'registreerunu', 'meesbaleriin', 'mineraalvesi', 'illustraator', 'urusuu', 'keevalisus', 'soovimatu', 'huulhein', 'soomuslehik', 'muinasjutumaa', 'armsam', 'laenureiting', 'enesevalitsusega', 'lootevedelik', 'aeroliit', 'formaalsus', 'oopus', 'puuviljapuding', 'punaveresus', 'argisus', 'plaatija', 'kartmatult', 'mileetose', 'pagema', 'kalorid', 'kukkurpall', 'tsirkooniumoksiid', 'praekartulid', 'komistama', 'kalibreerimine', 'lillekimp', 'puutuja', 'viljakoristaja', 'liimima', 'tseoliit', 'samoalane', 'patriotism', 'relvastamine', 'kahver', 'kuumaveeallikas', 'sofistika', 'taskulambipatarei', 'kalakakk', 'seljatugi', 'galantselt', 'hoiduma', 'millimeeter', 'ruut', 'vaestekool', 'udujutt', 'juuksekarv', 'viskoossus', 'lukulluslik', 'prisma', 'suulised', 'kaasus', 'vembumees', 'implantaator', 'metsotinto', 'kehvus', 'autentselt', 'apostaat', 'imetlema', 'gastroenteroloog', 'taasetendamine', 'karikatuurne', 'niisutus', 'soolsus', 'vihmapiisk', 'maalane', 'infotalitus', 'igandid', 'fallos', 'aknakitt', 'viirpuu', 'kilpkonnalised', 'poodium', 'jaataja', 'ballistika', 'keskhammasratas', 'neljajalgne', 'periskoopkompass', 'saan', 'agar', 'valmiskirjutatud', 'metsalangetus', 'olustikumaal', 'kaabuserv', 'suhteliselt', 'minestama', 'verekaotus', 'morfeem', 'situatsioonikoomika', 'aksonomeetria', 'tuttavlikult', 'esikohapretendendid', 'kerajas', 'seinamaal', 'meridiaan', 'kunstimuuseum', 'ehisliist', 'afgaan', 'kiilasrehv', 'mediteerivalt', 'kvaliteetleht', 'keelduja', 'tursuma', 'folklorist', 'looritatud', 'heinaseeme', 'navigaator', 'ebakindlalt', 'demilitariseerimine', 'teenar', 'puertoriiko', 'triviaalsus', 'neetud', 'ujumislestad', 'teotus', 'lugematu', 'makromolekul', 'jorutama', 'elamine', 'serveerimislaud', 'iililine', 'mudakoon', 'lingitud', 'karmistuma', 'nimetasid', 'veebikelmus', 'mullivann', 'bitikiirus', 'hegellus', 'kaaskodanik', 'riisihautis', 'kunstnik', 'kogukasum', 'neokantiaanlus', 'golf', 'jutukalt', 'anno', 'devalveerima', 'sealkandis', 'vool', 'tahteigatsus', 'maaregister', 'seiskunud', 'tukk', 'seletatav', 'supernali', 'omakasvatatud', 'traagiline', 'proosakirjandus', 'feodaalne', 'mittekanooniline', 'nansuk', 'alaealised', 'pagu', 'algul', 'harakputk', 'juurapraktikant', 'nuhkija', 'kohutatud', 'tehnika', 'lubatavus', 'puurmasin', 'langetatud', 'kannustaja', 'parendama', 'asutatud', 'rakendusmatemaatika', 'barrel', 'edaspidine', 'sissetung', 'ksenoonid', 'aluskiht', 'lagedale', 'mujal', 'pumbajaam', 'koostisosa', 'giljotineerimine', 'tugevnemine', 'koristatud', 'suvakohane', 'roobas', 'aroomikas', 'jaluserihm', 'kinnisvararegister', 'pagendama', 'pisimeteoriit', 'ametivend', 'pakiline', 'sisseimbumine', 'stress', 'kasulikult', 'lakmus', 'keetel', 'maapiirkond', 'otsima', 'rannakarp', 'kreatsionist', 'ebaefektiivsus', 'ehispaneel', 'palun', 'streik', 'veeimeja', 'kuumaveepudel', 'patuurgas', 'humanitaarne', 'naturaalselt', 'hapendamata', 'huultega', 'valguma', 'valgeplekk', 'kauteriseerimine', 'lahknemine', 'lillkapsas', 'tonaalsus', 'solfataar', 'basipetaalne', 'kaitsepiirded', 'metaeetika', 'avariiohtlik', 'karjaseonn', 'millel', 'amfiib', 'misoneist', 'iluaed', 'obligatsioon', 'soolasus', 'andestama', 'lohisti', 'virgutama', 'vakuolaarne', 'seebikast', 'valu', 'zooliit', 'siledakarvaline', 'zoosporangium', 'ristimiskarikas', 'honduraslane', 'tikspulk', 'tusatseja', 'kelt', 'karjaajamine', 'hammustaja', 'peantslanna', 'siirdamine', 'anglitsism', 'piiskopkonna', 'veised', 'meedium', 'peidukoht', 'peaosa', 'siinilmas', 'ebavooruslik', 'uimerdamine', 'tantsupartner', 'sukeldumisvarustus', 'seadustatud', 'punkt', 'teisaldusbager', 'putukavastne', 'realist', 'pimemale', 'aprioorsus', 'kavatsusavaldus', 'lahknevusaste', 'teritama', 'analoogselt', 'ihaldamine', 'sarkastiline', 'ablatiiv', 'petlikkus', 'dioktaeedriline', 'protestija', 'keerulisus', 'tahuma', 'iseteadvalt', 'pessaar', 'kohtumine', 'viirus', 'loos', 'kaugeleulatuv', 'hirvesarv', 'dekadents', 'kluppimisleht', 'raudrohi', 'metamfetamiin', 'ennastohverdavus', 'minestushoog', 'regilaul', 'matslikult', 'jaam', 'kortisoon', 'piitsutav', 'alpinist', 'uitama', 'proovilapp', 'rahhiit', 'kalasarnane', 'maiade', 'vahamaal', 'vereplekkides', 'neuron', 'kaaskannataja', 'televiisor', 'tollipuu', 'magnettorm', 'muserdama', 'vaoshoitult', 'kuberner', 'tuhm', 'agnoosia', 'vale', 'ahtrimast', 'geraniool', 'maksukoorem', 'kromosoom', 'vahetund', 'muldama', 'geneetiliselt', 'karistus', 'kuumutatav', 'vastandid', 'raadiolokatsioon', 'poeabiline', 'halvustaja', 'epistemoloog', 'kannatus', 'stenotoopne', 'vojerism', 'frekventatiiviliited', 'lennukitorpeedo', 'ruutkeskmine', 'jalutusrihm', 'maitsma', 'tormijakk', 'jahuveski', 'kokkusattumine', 'kreosoot', 'kramplukk', 'mururull', 'kiusama', 'puudutama', 'isatu', 'palktee', 'orgaaniliselt', 'lahingulennuk', 'aeglustama', 'lukk', 'kalleim', 'reetiline', 'puiduhakkija', 'vananenud', 'evolutsionism', 'serv', 'tulemusena', 'parketilipp', 'neitsilikkus', 'kriminogeenne', 'aktualiseerimine', 'korrosioon', 'paskal', 'elektrijuhe', 'dresseeritav', 'varietee', 'meloodiliselt', 'demokratiseerima', 'pamp', 'teravmeelselt', 'mootoriruum', 'hukatuslik', 'hobuserautaja', 'informatsioon', 'vaesustatud', 'raevutsev', 'jooneline', 'inimfaktor', 'elektrotehniline', 'riisikasvatus', 'entiteet', 'tervislikkus', 'ooteruum', 'marsruuttakso', 'lustiliselt', 'riideproov', 'rendiregister', 'raiskamine', 'traagik', 'nukrameelne', 'vangiraudades', 'taasleidmine', 'koba', 'uusplatonism', 'notar', 'translatiiviliited', 'demagoogiliselt', 'kroonleht', 'vastupidine', 'vajama', 'abivedur', 'mikrokuju', 'maakleritalitus', 'konfrontatsioon', 'instrumentaalmuusika', 'kausaaladverbiaal', 'kutsuja', 'sisal', 'lipuliin', 'kaasahaaratud', 'talihari', 'hambaprotees', 'veebruar', 'hauaplats', 'otstest', 'lobisemine', 'osake', 'jumalik', 'vorpima', 'buss', 'seksuaalne', 'siniraaglased', 'grupp', 'sieena', 'vaheldumine', 'pudemed', 'atleetlikkus', 'ainepunkt', 'tuharest', 'ebainimlikustamine', 'vingerdama', 'raalkonstrueerimine', 'kilomeetripost', 'greif', 'hiiglaslik', 'paakpoi', 'sammastik', 'klaasistunud', 'ahvenad', 'kased', 'karjuv', 'degusteerija', 'piinama', 'eluajal', 'lihaskramp', 'neegrinaine', 'tabamatu', 'kisendama', 'referent', 'katabaatiline', 'mikrostruktuur', 'ventilaatoririhm', 'kiisu', 'kolonn', 'noodijoonestik', 'paak', 'temperatuuriaisting', 'lehemardikas', 'kriips', 'ptigmatiit', 'omanikuta', 'gaasiturbiin', 'jumetus', 'maoor', 'rivistuma', 'soomlane', 'amhaar', 'laastavalt', 'kaasseltsiline', 'sihtotstarve', 'heaoluriik', 'tulejuhtija', 'ehituslik', 'allutamine', 'infusioonvedelikud', 'eoslehed', 'vesine', 'karastuma', 'vallutav', 'kandetala', 'riiukus', 'kattimine', 'vahustatud', 'perfokaart', 'teoloog', 'vihkamine', 'nuuskiv', 'koond', 'mammutlik', 'gorilla', 'fideism', 'pahategevus', 'tsiviliseerima', 'metallivalu', 'magnetekvaator', 'uinuma', 'ennetama', 'aleurooniterad', 'voodihaige', 'oluline', 'kroonika', 'kummargil', 'frotee', 'stauroliit', 'juugend', 'barbitaal', 'oleiinhape', 'kodarluu', 'plasma', 'tegevuses', 'kellarihm', 'ettekirjutused', 'hulgaline', 'refraktomeeter', 'lapsendama', 'nurjunud', 'diktaatorlikult', 'vintlased', 'segaabielu', 'kohvikoor', 'inimkond', 'tikitud', 'konverentsisaal', 'mitmeotstarbeline', 'kuualune', 'aktiivkasutus', 'kokaraamat', 'plaaster', 'valgevaal', 'paigutus', 'hiilimisi', 'ringutama', 'taastuma', 'rasvkude', 'diabeet', 'pooluni', 'mittetulunduslik', 'midagi', 'maonahk', 'salvestis', 'ksenoliit', 'konformist', 'kohtus', 'maksja', 'suurilmalik', 'birmalane', 'kategooria', 'kontsentriline', 'esitaja', 'kuurort', 'pidurdamatu', 'rohtpuu', 'arvutiasjatundjad', 'provintsiaalsus', 'kantiin', 'dispuut', 'elevandijuht', 'esteetiliselt', 'krediitkonto', 'saam', 'laitma', 'kaupmeheamet', 'maitselage', 'jalutuskepp', 'mateeria', 'muhamedlane', 'pihustiballoon', 'personal', 'keerupulk', 'reetlikult', 'liikuja', 'ilustatult', 'kolonialist', 'priiskav', 'kohe', 'kenam', 'merematus', 'liputamine', 'aseksuaalne', 'emboolia', 'hauduma', 'kummikelgutamine', 'ajutegevus', 'vanaaeg', 'rabe', 'lihtsustus', 'piiskop', 'kangidena', 'juhendaja', 'teadlane', 'poise', 'oktsidentalism', 'bassilauljad', 'tunnetav', 'raskpagu', 'tsirkuseartist', 'rindtarind', 'impeerium', 'dedveit', 'elementaarselt', 'galopeerima', 'haukumine', 'proosa', 'valju', 'volikogu', 'hingeldus', 'rindejoon', 'soonikas', 'hukkumine', 'gaas', 'vahistatu', 'valestart', 'velariseerima', 'laenguta', 'vanameelne', 'fluorestsents', 'valdus', 'ersa', 'lobjakas', 'avastama', 'kassikuld', 'esimesena', 'britid', 'madallend', 'vahekohus', 'compadre', 'ateistlik', 'mittelaevatatav', 'seesimine', 'kinooperaator', 'teatraalsus', 'anduv', 'argentiina', 'pataljon', 'rattapulk', 'lihtrahvalik', 'teisaldamine', 'loots', 'iluravimask', 'elustus', 'saaja', 'rutem', 'raamaturiiul', 'juussooned', 'suguharu', 'matused', 'anemofiilia', 'ajutine', 'vaseliin', 'ruumikus', 'himuralt', 'pikkus', 'reglett', 'innustuma', 'kaliofiliit', 'hangeldaja', 'kopti', 'sits', 'magenta', 'programmeerimine', 'jahisaak', 'lehvikesega', 'immutama', 'masendatud', 'mantel', 'aluskalju', 'teenus', 'veripannkook', 'ibuprofeen', 'kokkuvajunud', 'hakkaja', 'gravimeeter', 'viperusteta', 'pigimust', 'leksikoloogia', 'vahatama', 'dada', 'surkima', 'kajutikaaslane', 'egoistlik', 'mausoleum', 'osjalised', 'rubla', 'kiitlema', 'soine', 'keskus', 'habemenuga', 'kalestama', 'turist', 'siidisabalased', 'ligidus', 'otsepealetung', 'tahkumine', 'suhkrupeet', 'himuline', 'konfiguratsioon', 'tahhograaf', 'jahumardikas', 'raamistus', 'kapparikaste', 'kokkusobimatult', 'elunautleja', 'soojapuhur', 'pautima', 'preventsioon', 'pikantsus', 'seksuaaliha', 'tagala', 'ekspluateerimine', 'ujupuu', 'hemomeeter', 'invasiooni', 'kaaluvihid', 'emaplaat', 'lahtivise', 'piltilus', 'kahevalentne', 'kongressiliikmed', 'hiromant', 'taksoarve', 'enesekaitseks', 'koketeerivalt', 'vadoosne', 'emitent', 'luigepoeg', 'dosaator', 'muljutud', 'helilaine', 'assortii', 'sisseseadmine', 'autigeenne', 'tangupuder', 'seismoloog', 'juhtkuju', 'tuju', 'teenistusliik', 'publik', 'langerdamine', 'pakendamata', 'sotsiaalabi', 'diarhia', 'hapukas', 'ajuvigastus', 'kinnitama', 'eelnev', 'kuppel', 'liibuv', 'vahanahk', 'suuraju', 'tarind', 'arusaamatult', 'veekuurort', 'rusikas', 'mungalill', 'tervitama', 'puistetoos', 'eksistents', 'omistusseadised', 'tunnetuslikult', 'ehmatavalt', 'ristand', 'gladiaatorite', 'sajakordistama', 'pakikandja', 'leivapuru', 'dublett', 'hirvenahk', 'kiropraktik', 'kuues', 'bakterivastane', 'klimaatiline', 'tagaplaan', 'kilomeeter', 'vaevu', 'pintsel', 'proletaarlane', 'tulemusteta', 'muistend', 'praktiliselt', 'seeriaviisi', 'amigo', 'lahas', 'toatemperatuur', 'idiootsus', 'teostus', 'omikron', 'vigisema', 'bakteriostaas', 'tunnetuspiir', 'kinnituspoi', 'aneuploidsus', 'tolmukas', 'idiomaatilisus', 'aritmeetika', 'antidemokraatia', 'kintsukraapimine', 'roim', 'volt', 'kohtukulud', 'langevarjudessant', 'alusseelik', 'stoll', 'valgus', 'kondotjeer', 'karst', 'anaboolne', 'siirdesoo', 'lopsakalt', 'dokid', 'avastamisprotseduur', 'hubasus', 'niisuti', 'fenomenoloogia', 'kristall', 'upsakas', 'ponks', 'bakter', 'ebainimlikkus', 'kobestama', 'vastavus', 'uuendus', 'protektoraat', 'vastupidi', 'tollideklaratsioon', 'soolvesi', 'argilliitne', 'sinusoid', 'anemofiil', 'valmistaja', 'harjaseline', 'kuulake', 'audiomeetria', 'meeleandmed', 'meisel', 'pinnuline', 'katedraal', 'valmisolek', 'vaimukas', 'laid', 'ohupeiling', 'lilleseade', 'erapooletu', 'mustav', 'vussiajamine', 'kaitseriietus', 'liigesesisene', 'rahustavalt', 'tootenumber', 'kuivainekarp', 'mitmesugused', 'gastriit', 'varaan', 'bimetallriba', 'antropoidne', 'maraton', 'tsinkima', 'noumen', 'megaparsek', 'karjakaupa', 'seebralill'];
// MORSE OSAD

var kood = {

//        "'": '.----.',
//        '(': '-.--.-',
//        ')': '-.--.-',
//        ',': '--..--',
//        '-': '-....-',
//        '.': '.-.-.-',
//        '/': '-..-.',
//        '0': '-----',
//        '1': '.----',
//        '2': '..---',
//        '3': '...--',
//        '4': '....-',
//        '5': '.....',
//        '6': '-....',
//        '7': '--...',
//        '8': '---..',
//        '9': '----.',
//        ':': '---...',
//        ';': '-.-.-.',
//        '?': '..--..',
    'A': '.-',
    'B': '-...',
    'C': '-.-.',
    'D': '-..',
    'E': '.',
    'F': '..-.',
    'G': '--.',
    'H': '....',
    'I': '..',
    'J': '.---',
    'K': '-.-',
    'L': '.-..',
    'M': '--',
    'N': '-.',
    'O': '---',
    'P': '.--.',
    'Q': '--.-',
    'R': '.-.',
    'S': '...',
    'T': '-',
    'U': '..-',
    'V': '...-',

    'Ä': '.-.-',
    'Ö': '---.',
    'Ü': '..--',
    'Õ': '..--',

    'W': '.--',
    'X': '-..-',
    'Y': '-.--',
    'Z': '--..'
}


var text_morseks = function (text) {
    var morseMsg = ''
    for (i = 0; i < text.length; i++) {
        if (text[i] != ' ') {
            character = kood[text[i].toUpperCase()];
            (i != text.length - 1) ? morseMsg += character + ' ' : morseMsg += character
        }
        else {
            morseMsg += '\t';
        }
    }
//    console.log(morseMsg)
//    console.log(text)
    return morseMsg
}

function mKood_to_playlist(mMsg) {
    //param mMsg - morse kood ntx ...---...

    playlist = [];
    mItem = ''
    for (i = 0; i < mMsg.length; i++) {

        if (mMsg[i] == '.') {
            mItem = 'dot'
        }
        else if (mMsg[i] == '-') {
            mItem = 'dash'
        }
        else if (mMsg[i] == ' ') {
            mItem = ' '
        }
        // else {mItem='\t'}
        playlist.push(mItem);
    }
    return playlist;
}


function play_morse(playlist, sona_indx) {

    audio_play = true;
    if (sona_indx == 0) {
        paint_word(sona_indx);
    }
    audio = new Audio();
    morse_symbol = playlist.shift();
    audio.src = "SOUND/" + morse_symbol + '.mp3';
    //console.log(morse_symbol, playlist.length);
    audio.loop = false;
    audio.play();

    audio.addEventListener("ended", function () {
        if (playlist.length > 0) {
            morse_symbol = playlist.shift();
            //console.log(morse_symbol, playlist.length);
            if (morse_symbol != ' ') {
                audio.src = "SOUND/" + morse_symbol + '.mp3';
                audio.play();
            }

            else {
                sona_indx += 1;

                paint_word(sona_indx);
                setTimeout(function () {
                    play_morse(playlist, sona_indx)
                }, 300);
            }
        }
        else {
            audio_play = false;
            if (sona_indx == 101) {
                $(symbol).css('background-color', 'white');
            }
        }
    });
}

function paint_word(indx) {

    $('.' + indx.toString()).css('color', 'red');
    //console.log(i);
    if (indx > 0) {
        $('.' + (indx - 1).toString()).css('color', 'black');
    }
    if (arvatav_sona.length == indx + 1) {
        setTimeout(function () {
            $('.' + indx.toString()).css('color', 'black');
        }, 2000);
    }

}
// MAIN CODE jQuery

function leia_arvatav_sona() {
//$.get('eesti_sonad.txt', function(data)
//    {
//    var sonad = data.split(' ');
    arvatav_sona = sonad[randrange(0, sonad.length)];

    //document.getElementById("demo").innerHTML = arvatav_sona.toUpperCase();

    morse_kood = text_morseks(arvatav_sona);
    console.log(morse_kood + ' ' + morse_kood.length);
    pList = mKood_to_playlist(morse_kood);
    console.log(pList);

    // });
    return arvatav_sona;
}

//var word = 'HANGMAN';
// var closed_count=0; //arvatav_sona.length;

function hangman() {

    $('#alpha').show();
    $('#pilt').html($('<img src="PICS/' + vead.toString() + '.png">'));

    $.each(alpha.split(''), function (i, val) {

        $('#alpha').append($('<div class="guess">' + val + '</div>'));
    });
    $.each(word.split(''), function (i, val) {

        $('#word').append($('<span class=' + i + ' letter="' + val + '">_</span>'));
    });

    $('.guess').click(function () {
        if (game) {
            var count = $('#word [letter=' + $(this).text() + ']').each(function () {
                $(this).text($(this).attr('letter'));
            }).length;

            $(this).removeClass('guess').css('color', (count > 0 ? 'limegreen' : 'red')).unbind('click');

            $(this).fadeOut(1000);

            if (count == 0) {
                vead++; //vigade loendur
                $('#pilt').html($('<img src="PICS/' + vead.toString() + '.png">')); //näitame uut pilti

                if (vead == 7) {
                    $(s).show();
                    game = false; //Kui on tehtud 7 viga, siis on mäng läbi
                    $('#word span').each(function (index) {
                        if ($(this).text() == '_') {
                            $(this).text($(this).attr('letter'));
                        }
                    });
                }
            }
            console.log('VIGU KOKKU: ', vead);

            closed_count = 0;
            $('#word span').each(function (index) {
                if ($(this).text() == '_') {
                    closed_count += 1;
                }
            });

            if (closed_count == 0 & game) {
                $(s).show();
                game = false;
                $('#pilt').html($('<img src="PICS/elus.png">'));
            } //Kõik sai arvatud, arvaja jäi ellu!
        }
    });
}


function morse_t2hestik() {

}

$(document).ready(function () {

    //$(replay).hide();

    $.each(kood, function (index, value) {
        $('#morse_dict').append($('<div id="symbol"><span STYLE="color: red;">' + index + '</span ><span>  ' + value + '</span></div>'));

    });

    $(symbol).click(function () {
        chr = $(this).text()[0];
        console.log('morse symbol: ', chr);

        //pList=mKood_to_playlist(text_morseks(chr));
        if (!audio_play) {
            play_morse(mKood_to_playlist(text_morseks(chr)), 101); //Kui parasjagu midagi muud ei mängi...
            $(this).css('background-color', 'yellow');
            // $(symbol).css('background-color',  'blue');

            //console.log($(this));
        }

    });

    $(s).click(function () {
        //hävitame olemasolevad elemndid, vajalik kui eelnevalt on sõnu juba arvatud!
        //$(replay).show();
        $(s).hide();
        $('#word').html('');
        $('#alpha').html('');

        game = true;
        vead = 0;
        arvatav_sona = leia_arvatav_sona();
        console.log(arvatav_sona);
        pList = mKood_to_playlist(text_morseks(arvatav_sona));

        word = arvatav_sona.toUpperCase();
        hangman();
        play_morse(pList, 0);

    });

    $(replay).click(function () {
        //hävitame olemasolevad elemndid, vajalik kui eelnevalt on sõnu juba arvatud!

        pList = mKood_to_playlist(text_morseks(arvatav_sona));
        if (!audio_play) {
            play_morse(pList, 0);
        }

    });
    morse_t2hestik();
});
