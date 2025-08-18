const results = [
  {"Ranking": 1, "Candidate - ID":"25216","First Name":"Akram","Last Name":"Zakine","Education level":"Bac +1","Affiliation":"Lycée Louis-le-Grand","P1":"10","P2":"4","P3":"10","P4":"1","DAY 1":"25","P5":"10","P6":"10","P7":"10","P8":"5","DAY 2":"35","Total":"60"}
  ,
  {"Ranking": 1, "Candidate - ID":"25084","First Name":"Ayman","Last Name":"M'KHANTAR","Education level":"Bac +2","Affiliation":"Al Zahraoui","P1":"10","P2":"10","P3":"10","P4":"0","DAY 1":"30","P5":"10","P6":"10","P7":"10","P8":"0","DAY 2":"30","Total":"60"},
  {"Candidate - ID":"25076","First Name":"Bakr","Last Name":"Daif","Education level":"Bac +2","Affiliation":"Lycée Mohammed VI d’Excellence","P1":"9","P2":"3","P3":"10","P4":"10","DAY 1":"32","P5":"10","P6":"10","P7":"4","P8":"0","DAY 2":"24","Total":"56"}
  ,
  {"Candidate - ID":"25195","First Name":"Ayman","Last Name":"Riad Solh","Education level":"Bac +1","Affiliation":"MIT","P1":"10","P2":"7","P3":"4","P4":"0","DAY 1":"21","P5":"10","P6":"10","P7":"10","P8":"2","DAY 2":"32","Total":"53"},
  {"Ranking": 5, "Candidate - ID":"25044","First Name":"Adam","Last Name":"Bennaceur","Education level":"Bac +2","Affiliation":"Lycée Mohammed VI d’Excellence","P1":"10","P2":"0","P3":"0","P4":"10","DAY 1":"20","P5":"9","P6":"10","P7":"10","P8":"1","DAY 2":"30","Total":"50"}
  ,
  {"Ranking": 5, "Candidate - ID":"25042","First Name":"Mahdi","Last Name":"BENKHADRA","Education level":"Bac +1","Affiliation":"Lycée Louis-le-Grand","P1":"10","P2":"10","P3":"0","P4":"0","DAY 1":"20","P5":"8","P6":"10","P7":"10","P8":"2","DAY 2":"30","Total":"50"}
  ,
  {"Candidate - ID":"25016","First Name":"EL OMRANI","Last Name":"AKRAM","Education level":"Bac +2","Affiliation":"Lycée Mohammed VI d’Excellence","P1":"10","P2":"3","P3":"0","P4":"9","DAY 1":"22","P5":"10","P6":"8","P7":"3","P8":"2","DAY 2":"23","Total":"45"}
  ,
  {"Candidate - ID":"25083","First Name":"Yahya","Last Name":"El Azzouzi","Education level":"Bac +1","Affiliation":"ZAHRAWI","P1":"10","P2":"10","P3":"0","P4":"0","DAY 1":"20","P5":"9","P6":"10","P7":"3","P8":"1","DAY 2":"23","Total":"43"},
  {"Candidate - ID":"25047","First Name":"Mohammed","Last Name":"Benomar El Mdeghri","Education level":"Bac +4","Affiliation":"Ecole Mohammadia D'Ingenieurs","P1":"10","P2":"9","P3":"0","P4":"0","DAY 1":"19","P5":"8","P6":"6","P7":"8","P8":"1","DAY 2":"23","Total":"42"},
  {"Ranking": 10, "Candidate - ID":"25165","First Name":"Adam","Last Name":"Mahdane","Education level":"Bac +1","Affiliation":"Lycée Mohammed VI d’Excellence","P1":"10","P2":"8","P3":"1","P4":"4","DAY 1":"23","P5":"8","P6":"10","P7":"0","P8":"0","DAY 2":"18","Total":"41"}
  ,
  {"Ranking": 10, "Candidate - ID":"25032","First Name":"Adam","Last Name":"Baali","Education level":"Bac +2","Affiliation":"Lycée Mohammed VI d’Excellence","P1":"10","P2":"0","P3":"0","P4":"10","DAY 1":"20","P5":"8","P6":"10","P7":"0","P8":"3","DAY 2":"21","Total":"41"}
  ,
  {"Candidate - ID":"25064","First Name":"Mohamed adam","Last Name":"Boussif","Education level":"Bac +1","Affiliation":"Lycée Mohammed VI d’Excellence","P1":"7","P2":"7","P3":"10","P4":"0","DAY 1":"24","P5":"9","P6":"7","P7":"0","P8":"0","DAY 2":"16","Total":"40"}
  ,
  {"Ranking": 13, "Candidate - ID":"25214","First Name":"Bakkouri","Last Name":"Youssef","Education level":"Bac +2","Affiliation":"LYMED","P1":"7","P2":"0","P3":"8","P4":"1","DAY 1":"16","P5":"0","P6":"10","P7":"10","P8":"0","DAY 2":"20","Total":"36"},
  {"Ranking": 13, "Candidate - ID":"25182","First Name":"Mohammed Amine","Last Name":"MOUTAHID","Education level":"Bac +2","Affiliation":"Lycée Mohammed VI d’Excellence","P1":"10","P2":"7","P3":"6","P4":"0","DAY 1":"23","P5":"0","P6":"10","P7":"3","P8":"0","DAY 2":"13","Total":"36"}
  ,
  {"Ranking": 13, "Candidate - ID":"25059","First Name":"Adam","Last Name":"Boulaich","Education level":"Bac +2","Affiliation":"Lycée Al ZAHRAWI","P1":"10","P2":"8","P3":"7","P4":"0","DAY 1":"25","P5":"10","P6":"1","P7":"0","P8":"0","DAY 2":"11","Total":"36"}
  ,
  {"Candidate - ID":"25038","First Name":"Yahya","Last Name":"Benaissa","Education level":"Bac +1","Affiliation":"Al Zahraoui","P1":"10","P2":"10","P3":"1","P4":"0","DAY 1":"21","P5":"10","P6":"4","P7":"0","P8":"0","DAY 2":"14","Total":"35"},
  {"Candidate - ID":"25020","First Name":"Taha","Last Name":"AMRANI","Education level":"Bac +2","Affiliation":"Lycée Hoche","P1":"10","P2":"0","P3":"0","P4":"1","DAY 1":"11","P5":"10","P6":"10","P7":"3","P8":"0","DAY 2":"23","Total":"34"}
  ,
  {"Candidate - ID":"25005","First Name":"Hudhaifa","Last Name":"Adriouche","Education level":"Bac +3","Affiliation":"Université Paris-Saclay","P1":"10","P2":"10","P3":"0","P4":"1","DAY 1":"21","P5":"10","P6":"0","P7":"0","P8":"0","DAY 2":"10","Total":"31"}
  ,
  {"Ranking": 19, "Candidate - ID":"25202","First Name":"Ayoub","Last Name":"SAOUD","Education level":"Bac +2","Affiliation":"Lycée Mohammed VI d’Excellence","P1":"10","P2":"1","P3":"0","P4":"0","DAY 1":"11","P5":"10","P6":"8","P7":"1","P8":"0","DAY 2":"19","Total":"30"}
  ,
  {"Ranking": 19, "Candidate - ID":"25073","First Name":"Mohamed Yassine","Last Name":"Chebil","Education level":"Bac +1","Affiliation":"IPEST","P1":"6","P2":"1","P3":"0","P4":"0","DAY 1":"7","P5":"8","P6":"4","P7":"10","P8":"1","DAY 2":"23","Total":"30"},
  {"Candidate - ID":"25205","First Name":"Majd","Last Name":"Sebbah","Education level":"Bac +3","Affiliation":"Centrale supélec","P1":"9","P2":"9","P3":"0","P4":"0","DAY 1":"18","P5":"0","P6":"10","P7":"0","P8":"1","DAY 2":"11","Total":"29"}
  ,
  {"Ranking": 22, "Candidate - ID":"25008","First Name":"Ali","Last Name":"AHJYAGE","Education level":"Bac +2","Affiliation":"LYMED","P1":"10","P2":"0","P3":"6","P4":"0","DAY 1":"16","P5":"10","P6":"1","P7":"0","P8":"0","DAY 2":"11","Total":"27"},
  {"Ranking": 22, "Candidate - ID":"25085","First Name":"Nouemane","Last Name":"EL GAOU","Education level":"Bac +3","Affiliation":"ENSIAS","P1":"0","P2":"0","P3":"0","P4":"6","DAY 1":"6","P5":"10","P6":"1","P7":"10","P8":"0","DAY 2":"20","Total":"27"},
  {"Ranking": 24, "Candidate - ID":"25118","First Name":"Mariam","Last Name":"Gharbi","Education level":"Bac +2","Affiliation":"Lycée Louis-le-Grand","P1":"8","P2":"0","P3":"0","P4":"0","DAY 1":"8","P5":"10","P6":"7","P7":"0","P8":"1","DAY 2":"18","Total":"26"},
  {"Ranking": 24, "Candidate - ID":"25009","First Name":"SOUFIANE","Last Name":"AIT ABBOU","Education level":"Bac +2","Affiliation":"LYMED","P1":"7","P2":"0","P3":"0","P4":"0","DAY 1":"7","P5":"10","P6":"9","P7":"0","P8":"0","DAY 2":"19","Total":"26"},
  {"Candidate - ID":"25023","First Name":"Mehdi","Last Name":"Assalih","Education level":"Bac +2","Affiliation":"Lycée Mohammed VI d’Excellence","P1":"10","P2":"0","P3":"5","P4":"0","DAY 1":"15","P5":"9","P6":"1","P7":"0","P8":"0","DAY 2":"10","Total":"25"}
  ,
  {"Candidate - ID":"25102","First Name":"SAKINA","Last Name":"EL-BRANSI","Education level":"Bac +1","Affiliation":"Lycée Mohammed VI d’Excellence","P1":"10","P2":"0","P3":"0","P4":"0","DAY 1":"10","P5":"9","P6":"1","P7":"3","P8":"0","DAY 2":"13","Total":"23"}
  ,
  {"Candidate - ID":"25203","First Name":"Modeste","Last Name":"Savadogo","Education level":"Bac +2","Affiliation":"CPGE Abulcasis","P1":"10","P2":"2","P3":"0","P4":"0","DAY 1":"12","P5":"10","P6":"0","P7":"0","P8":"0","DAY 2":"10","Total":"22"},
  {"Candidate - ID":"25033","First Name":"Otman","Last Name":"Bahni","Education level":"Bac +1","Affiliation":"Lycée Mohammed VI d’Excellence","P1":"10","P2":"4","P3":"0","P4":"0","DAY 1":"14","P5":"8","P6":"0","P7":"0","P8":"0","DAY 2":"8","Total":"22"}
  ,
  {"Candidate - ID":"25123","First Name":"Idris","Last Name":"Hajji","Education level":"Bac +1","Affiliation":"IPEST","P1":"10","P2":"1","P3":"0","P4":"0","DAY 1":"11","P5":"10","P6":"0","P7":"0","P8":"0","DAY 2":"10","Total":"21"},
  {"Candidate - ID":"25167","First Name":"Mohamed Anas","Last Name":"Malki","Education level":"Bac +2","Affiliation":"Lycée Henri Poincaré","P1":"6","P2":"0","P3":"0","P4":"0","DAY 1":"6","P5":"10","P6":"0","P7":"4","P8":"0","DAY 2":"14","Total":"20"}
  ,
  {"Candidate - ID":"25141","First Name":"yassine","Last Name":"kamal","Education level":"Bac +2","Affiliation":"Lycée Mohammed VI d’Excellence","P1":"10","P2":"0","P3":"0","P4":"0","DAY 1":"10","P5":"9","P6":"1","P7":"0","P8":"0","DAY 2":"10","Total":"20"}
  ,
  {"Candidate - ID":"25139","First Name":"Yassir","Last Name":"JKAOUA","Education level":"Bac +1","Affiliation":"CPGE MY YOUSSEF","P1":"10","P2":"0","P3":"1","P4":"0","DAY 1":"11","P5":"9","P6":"0","P7":"0","P8":"0","DAY 2":"9","Total":"20"},
  {"Candidate - ID":"25137","First Name":"Abdellah","Last Name":"Ineflas","Education level":"Bac +2","Affiliation":"Lycée Mohammed VI d’Excellence","P1":"10","P2":"0","P3":"0","P4":"0","DAY 1":"10","P5":"10","P6":"0","P7":"0","P8":"0","DAY 2":"10","Total":"20"}
  ,
  {"Candidate - ID":"25124","First Name":"Mounir","Last Name":"HAMID","Education level":"Bac +1","Affiliation":"Lycée Mohammed VI d’Excellence","P1":"10","P2":"10","P3":"0","P4":"0","DAY 1":"20","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"20"}
  ,
  {"Candidate - ID":"25117","First Name":"Omar","Last Name":"Frej","Education level":"Bac +1","Affiliation":"Lycée Mohammed VI d’Excellence","P1":"8","P2":"9","P3":"2","P4":"0","DAY 1":"19","P5":"0","P6":"1","P7":"0","P8":"0","DAY 2":"1","Total":"20"}
  ,
  {"Candidate - ID":"25014","First Name":"NASSIM","Last Name":"AIT-SAID","Education level":"Bac +1","Affiliation":"Lycée Mohammed VI d’Excellence","P1":"10","P2":"0","P3":"0","P4":"0","DAY 1":"10","P5":"10","P6":"0","P7":"0","P8":"0","DAY 2":"10","Total":"20"}
  ,
  {"Candidate - ID":"25206","First Name":"Diae","Last Name":"Sefyani","Education level":"Bac +2","Affiliation":"Lycée Al-Zahrawi","P1":"10","P2":"0","P3":"9","P4":"0","DAY 1":"19","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"19"}
  ,
  {"Candidate - ID":"25144","First Name":"sami","Last Name":"khald","Education level":"Bac +1","Affiliation":"LYMED","P1":"10","P2":"0","P3":"0","P4":"0","DAY 1":"10","P5":"9","P6":"0","P7":"0","P8":"0","DAY 2":"9","Total":"19"},
  {"Candidate - ID":"25090","First Name":"Abdessamad","Last Name":"El Hilali","Education level":"Bac +2","Affiliation":"Centre CPGE Tétouan","P1":"8","P2":"0","P3":"0","P4":"0","DAY 1":"8","P5":"0","P6":"0","P7":"10","P8":"1","DAY 2":"11","Total":"19"}
  ,
  {"Candidate - ID":"25004","First Name":"El hachimi","Last Name":"Adnane","Education level":"Bac +1","Affiliation":"Lycée Mly ali Cherif errachidia","P1":"10","P2":"0","P3":"0","P4":"0","DAY 1":"10","P5":"9","P6":"0","P7":"0","P8":"0","DAY 2":"9","Total":"19"}
  ,
  {"Candidate - ID":"25161","First Name":"Taha","Last Name":"Lyousfi","Education level":"Bac +2","Affiliation":"Lycée Mohammed VI d’Excellence","P1":"8","P2":"0","P3":"0","P4":"0","DAY 1":"8","P5":"10","P6":"0","P7":"0","P8":"0","DAY 2":"10","Total":"18"}
  ,
  {"Candidate - ID":"25142","First Name":"Adam","Last Name":"Kamal saadi","Education level":"Bac +1","Affiliation":"Lycée Mohammed VI d’Excellence","P1":"8","P2":"1","P3":"0","P4":"0","DAY 1":"9","P5":"0","P6":"8","P7":"0","P8":"1","DAY 2":"9","Total":"18"}
  ,
  {"Candidate - ID":"25094","First Name":"Mohamed Amine","Last Name":"El Kalai","Education level":"Bac +3","Affiliation":"ENSAM -Rabat-","P1":"10","P2":"0","P3":"0","P4":"0","DAY 1":"10","P5":"0","P6":"8","P7":"0","P8":"0","DAY 2":"8","Total":"18"},
  {"Candidate - ID":"25034","First Name":"Hibatallah","Last Name":"Bahssini","Education level":"Bac +1","Affiliation":"Lycée Mohammed VI d’Excellence","P1":"10","P2":"0","P3":"0","P4":"0","DAY 1":"10","P5":"7","P6":"1","P7":"0","P8":"0","DAY 2":"8","Total":"18"}
  ,
  {"Candidate - ID":"25215","First Name":"haddadi","Last Name":"youssef","Education level":"Bac +3","Affiliation":"INPT","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"10","P6":"7","P7":"0","P8":"0","DAY 2":"17","Total":"17"},
  {"Candidate - ID":"25115","First Name":"Zakaria","Last Name":"HAMDOUN","Education level":"Bac +2","Affiliation":"Lycée Mohammed VI d’Excellence","P1":"7","P2":"0","P3":"0","P4":"0","DAY 1":"7","P5":"10","P6":"0","P7":"0","P8":"0","DAY 2":"10","Total":"17"}
  ,
  {"Candidate - ID":"25082","First Name":"Anas","Last Name":"El Azizi El Idrissi","Education level":"Bac +1","Affiliation":"LM6E","P1":"9","P2":"0","P3":"5","P4":"0","DAY 1":"14","P5":"0","P6":"0","P7":"1","P8":"0","DAY 2":"1","Total":"15"},
  {"Candidate - ID":"25208","First Name":"Ahmed","Last Name":"Squalli Houssaini","Education level":"Bac +1","Affiliation":"Lycée Louis-Le-Grand","P1":"10","P2":"3","P3":"0","P4":"0","DAY 1":"13","P5":"0","P6":"0","P7":"0","P8":"1","DAY 2":"1","Total":"14"}
  ,
  {"Candidate - ID":"25194","First Name":"Abdelhamid","Last Name":"Quajjia","Education level":"Bac +1","Affiliation":"LYMED","P1":"10","P2":"3","P3":"0","P4":"0","DAY 1":"13","P5":"0","P6":"1","P7":"0","P8":"0","DAY 2":"1","Total":"14"},
  {"Candidate - ID":"25054","First Name":"Ali","Last Name":"Boughazi","Education level":"Bac +2","Affiliation":"Lymed","P1":"2","P2":"1","P3":"0","P4":"0","DAY 1":"3","P5":"10","P6":"0","P7":"0","P8":"0","DAY 2":"10","Total":"13"},
  {"Candidate - ID":"25036","First Name":"Mohamed Adam","Last Name":"Beljadid","Education level":"Bac +3","Affiliation":"Ecole Mohammedia des ingénieurs","P1":"10","P2":"0","P3":"0","P4":"0","DAY 1":"10","P5":"0","P6":"0","P7":"3","P8":"0","DAY 2":"3","Total":"13"}
  ,
  {"Candidate - ID":"25209","First Name":"Aymen","Last Name":"TABITI","Education level":"Bac +1","Affiliation":"Lycée technique Mohamed 5 , Beni melll","P1":"10","P2":"0","P3":"0","P4":"0","DAY 1":"10","P5":"0","P6":"1","P7":"0","P8":"1","DAY 2":"2","Total":"12"}
  ,
  {"Candidate - ID":"25197","First Name":"Anas","Last Name":"Saada","Education level":"Bac +2","Affiliation":"Lycée Mohammed VI d'Excellence Benguerir","P1":"10","P2":"0","P3":"0","P4":"0","DAY 1":"10","P5":"1","P6":"0","P7":"0","P8":"1","DAY 2":"2","Total":"12"}
  ,
  {"Candidate - ID":"25187","First Name":"Mohamed","Last Name":"Nour","Education level":"Bac +2","Affiliation":"Lycée Mohamed 5 Casablanca","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"10","P6":"0","P7":"0","P8":"2","DAY 2":"12","Total":"12"}
  ,
  {"Candidate - ID":"25162","First Name":"Ilyass","Last Name":"M'hal","Education level":"Bac +2","Affiliation":"Lycée d'excellence Benguerir","P1":"10","P2":"1","P3":"0","P4":"0","DAY 1":"11","P5":"0","P6":"0","P7":"0","P8":"1","DAY 2":"1","Total":"12"}
  ,
  {"Candidate - ID":"25145","First Name":"Mohamed Amine","Last Name":"Hzikar","Education level":"Bac +1","Affiliation":"Al Zahrawi","P1":"10","P2":"0","P3":"0","P4":"0","DAY 1":"10","P5":"0","P6":"1","P7":"0","P8":"1","DAY 2":"2","Total":"12"},
  {"Candidate - ID":"25081","First Name":"Mohammed","Last Name":"Eddebbarh","Education level":"Bac +2","Affiliation":"LM6E","P1":"10","P2":"1","P3":"0","P4":"0","DAY 1":"11","P5":"0","P6":"1","P7":"0","P8":"0","DAY 2":"1","Total":"12"},
  {"Candidate - ID":"25056","First Name":"oussama","Last Name":"Bouhtouch","Education level":"Bac +2","Affiliation":"IBN TIMIYA","P1":"10","P2":"0","P3":"0","P4":"0","DAY 1":"10","P5":"0","P6":"1","P7":"0","P8":"1","DAY 2":"2","Total":"12"},
  {"Candidate - ID":"25213","First Name":"Mohamed Amine","Last Name":"YOUKAOUI","Education level":"Bac +3","Affiliation":"Emines-UM6P","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"10","P6":"0","P7":"1","P8":"0","DAY 2":"11","Total":"11"},
  {"Candidate - ID":"25186","First Name":"Aya","Last Name":"NAIT YAZZA","Education level":"Bac +3","Affiliation":"Emines-UM6P","P1":"10","P2":"0","P3":"0","P4":"0","DAY 1":"10","P5":"0","P6":"0","P7":"0","P8":"1","DAY 2":"1","Total":"11"},
  {"Candidate - ID":"25184","First Name":"SAAD","Last Name":"NACIRI","Education level":"Bac +2","Affiliation":"Lycée Méditerranéen de Martil (LYMED)","P1":"10","P2":"0","P3":"0","P4":"0","DAY 1":"10","P5":"0","P6":"0","P7":"1","P8":"0","DAY 2":"1","Total":"11"}
  ,
  {"Candidate - ID":"25176","First Name":"Brahim","Last Name":"Mekkaoui","Education level":"Bac +3","Affiliation":"ESI","P1":"10","P2":"0","P3":"0","P4":"0","DAY 1":"10","P5":"0","P6":"1","P7":"0","P8":"0","DAY 2":"1","Total":"11"},
  {"Candidate - ID":"25154","First Name":"Yassine","Last Name":"Lamnini","Education level":"Bac +2","Affiliation":"LYMED","P1":"10","P2":"0","P3":"0","P4":"0","DAY 1":"10","P5":"0","P6":"1","P7":"0","P8":"0","DAY 2":"1","Total":"11"},
  {"Candidate - ID":"25153","First Name":"Abdelwahab","Last Name":"LAKSIRI","Education level":"Bac +3","Affiliation":"University of Mohamed 6 Polytechnic","P1":"10","P2":"0","P3":"0","P4":"0","DAY 1":"10","P5":"0","P6":"1","P7":"0","P8":"0","DAY 2":"1","Total":"11"},
  {"Candidate - ID":"25149","First Name":"Fatimazahra","Last Name":"LAAROUSSI","Education level":"Bac +2","Affiliation":"Abulcasis","P1":"10","P2":"0","P3":"0","P4":"0","DAY 1":"10","P5":"0","P6":"0","P7":"0","P8":"1","DAY 2":"1","Total":"11"},
  {"Candidate - ID":"25116","First Name":"Youssef","Last Name":"Fatri","Education level":"Bac +2","Affiliation":"Lyceé Mohamed 5","P1":"10","P2":"1","P3":"0","P4":"0","DAY 1":"11","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"11"}
  ,
  {"Candidate - ID":"25099","First Name":"Sara","Last Name":"Bourhlam","Education level":"Bac +1","Affiliation":"Lycée d’excellence Al Zahrawi","P1":"9","P2":"0","P3":"0","P4":"0","DAY 1":"9","P5":"0","P6":"1","P7":"0","P8":"1","DAY 2":"2","Total":"11"}
  ,
  {"Candidate - ID":"25098","First Name":"ilias","Last Name":"el marzouki","Education level":"Bac +1","Affiliation":"CPGE moulay youssef rabat","P1":"2","P2":"0","P3":"0","P4":"0","DAY 1":"2","P5":"7","P6":"1","P7":"1","P8":"0","DAY 2":"9","Total":"11"},
  {"Candidate - ID":"25066","First Name":"Mohammed","Last Name":"Bouzidi","Education level":"Bac +2","Affiliation":"LM6E","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"7","P6":"0","P7":"4","P8":"0","DAY 2":"11","Total":"11"},
  {"Candidate - ID":"25043","First Name":"Adam","Last Name":"Benloughmari","Education level":"Bac +1","Affiliation":"Moulay Youssef","P1":"10","P2":"0","P3":"0","P4":"0","DAY 1":"10","P5":"0","P6":"1","P7":"0","P8":"0","DAY 2":"1","Total":"11"},
  {"Candidate - ID":"25027","First Name":"Détine Jean-Arthur","Last Name":"AWI","Education level":"Bac +2","Affiliation":"Abulcasis","P1":"10","P2":"1","P3":"0","P4":"0","DAY 1":"11","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"11"}
  ,
  {"Candidate - ID":"25192","First Name":"Younes","Last Name":"Ounacer","Education level":"Bac +1","Affiliation":"Moulay youssef","P1":"10","P2":"0","P3":"0","P4":"0","DAY 1":"10","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"10"},
  {"Candidate - ID":"25173","First Name":"Houssame","Last Name":"Mehrach","Education level":"Bac +2","Affiliation":"Lycee Omar Ibn Al khattab","P1":"9","P2":"0","P3":"0","P4":"0","DAY 1":"9","P5":"0","P6":"1","P7":"0","P8":"0","DAY 2":"1","Total":"10"},
  {"Candidate - ID":"25170","First Name":"Louay","Last Name":"Masbah","Education level":"Bac +2","Affiliation":"Lycée Omar Ibn Abdelaziz","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"10","P7":"0","P8":"0","DAY 2":"10","Total":"10"}
  ,
  {"Candidate - ID":"25166","First Name":"Ibrahim","Last Name":"Ait Zoulet","Education level":"Bac +1","Affiliation":"Lycée Al Zahrawi- Abulcasis","P1":"10","P2":"0","P3":"0","P4":"0","DAY 1":"10","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"10"}
  ,
  {"Candidate - ID":"25134","First Name":"Mohsine","Last Name":"HSSASSA","Education level":"Bac +2","Affiliation":"Lycée Moulay El","P1":"10","P2":"0","P3":"0","P4":"0","DAY 1":"10","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"10"}
  ,
  {"Candidate - ID":"25132","First Name":"Elarbi Walid","Last Name":"Houari","Education level":"Bac +1","Affiliation":"CPGE lycée technique Mohamed 5 , Beni mellal","P1":"10","P2":"0","P3":"0","P4":"0","DAY 1":"10","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"10"}
  ,
  {"Candidate - ID":"25130","First Name":"Mouad","Last Name":"HMAMOU","Education level":"Bac +1","Affiliation":"cpge moulay idriss","P1":"10","P2":"0","P3":"0","P4":"0","DAY 1":"10","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"10"},
  {"Candidate - ID":"25129","First Name":"Ahmed","Last Name":"Hmamou","Education level":"Bac +2","Affiliation":"LM6E","P1":"10","P2":"0","P3":"0","P4":"0","DAY 1":"10","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"10"},
  {"Candidate - ID":"25111","First Name":"Rayane","Last Name":"ETTACHFINI","Education level":"Bac +2","Affiliation":"Lymed","P1":"10","P2":"0","P3":"0","P4":"0","DAY 1":"10","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"10"},
  {"Candidate - ID":"25089","First Name":"Mohammed- Rida","Last Name":"EL HANI","Education level":"Bac +3","Affiliation":"College of computing Um6p","P1":"10","P2":"0","P3":"0","P4":"0","DAY 1":"10","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"10"},
  {"Candidate - ID":"25058","First Name":"nabil","Last Name":"bouknifi","Education level":"Bac +3","Affiliation":"Isima","P1":"10","P2":"0","P3":"0","P4":"0","DAY 1":"10","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"10"},
  {"Candidate - ID":"25052","First Name":"Othmane","Last Name":"Boudi","Education level":"Bac +3","Affiliation":"Ecole mohammadia d’ingenieurs","P1":"10","P2":"0","P3":"0","P4":"0","DAY 1":"10","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"10"}
  ,
  {"Candidate - ID":"25049","First Name":"Oussama","Last Name":"BLGRIM","Education level":"Bac +3","Affiliation":"Ensimag","P1":"10","P2":"0","P3":"0","P4":"0","DAY 1":"10","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"10"},
  {"Candidate - ID":"25048","First Name":"Ahmed Mehdi","Last Name":"Berrada","Education level":"Bac +2","Affiliation":"LYMED","P1":"10","P2":"0","P3":"0","P4":"0","DAY 1":"10","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"10"},
  {"Candidate - ID":"25028","First Name":"Zohair","Last Name":"Ayadi","Education level":"Bac +1","Affiliation":"IPEST","P1":"10","P2":"0","P3":"0","P4":"0","DAY 1":"10","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"10"},
  {"Candidate - ID":"25021","First Name":"Sami","Last Name":"Sarhane","Education level":"Bac +2","Affiliation":"LM6E","P1":"10","P2":"0","P3":"0","P4":"0","DAY 1":"10","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"10"},
  {"Candidate - ID":"25018","First Name":"Rachid","Last Name":"Amassad","Education level":"Bac +1","Affiliation":"CADI AYYAD","P1":"8","P2":"0","P3":"0","P4":"0","DAY 1":"8","P5":"0","P6":"1","P7":"0","P8":"1","DAY 2":"2","Total":"10"},
  {"Candidate - ID":"25185","First Name":"Salma","Last Name":"Nadir","Education level":"Bac +1","Affiliation":"lycée mohammed 5 beni mellal","P1":"8","P2":"0","P3":"0","P4":"0","DAY 1":"8","P5":"0","P6":"0","P7":"0","P8":"1","DAY 2":"1","Total":"9"}
  ,
  {"Candidate - ID":"25133","First Name":"Omar","Last Name":"Hricha","Education level":"Bac +1","Affiliation":"LM6E","P1":"7","P2":"1","P3":"0","P4":"0","DAY 1":"8","P5":"0","P6":"1","P7":"0","P8":"0","DAY 2":"1","Total":"9"},
  {"Candidate - ID":"25107","First Name":"Yassine","Last Name":"Ennasser","Education level":"Bac +1","Affiliation":"LM6E","P1":"8","P2":"0","P3":"0","P4":"0","DAY 1":"8","P5":"0","P6":"0","P7":"1","P8":"0","DAY 2":"1","Total":"9"},
  {"Candidate - ID":"25106","First Name":"Abdessamia","Last Name":"Elmehdaoui","Education level":"Bac +1","Affiliation":"Lm6e","P1":"8","P2":"0","P3":"0","P4":"0","DAY 1":"8","P5":"0","P6":"0","P7":"1","P8":"0","DAY 2":"1","Total":"9"},
  {"Candidate - ID":"25087","First Name":"Saad","Last Name":"Bouachik","Education level":"Bac +1","Affiliation":"Lyceé mohmed 5","P1":"9","P2":"0","P3":"0","P4":"0","DAY 1":"9","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"9"}
  ,
  {"Candidate - ID":"25060","First Name":"mohamed","Last Name":"boulmelf","Education level":"Bac +1","Affiliation":"CPGE LYDEX","P1":"9","P2":"0","P3":"0","P4":"0","DAY 1":"9","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"9"},
  {"Candidate - ID":"25022","First Name":"Jrabi","Last Name":"Arafat","Education level":"Bac +2","Affiliation":"LYMED","P1":"9","P2":"0","P3":"0","P4":"0","DAY 1":"9","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"9"},
  {"Candidate - ID":"25199","First Name":"Soufiane","Last Name":"Sahouane","Education level":"Bac +1","Affiliation":"Lycée Mohammed 6 d'excellence de Benguerir LM6E","P1":"8","P2":"0","P3":"0","P4":"0","DAY 1":"8","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"8"}
  ,
  {"Candidate - ID":"25191","First Name":"Anass","Last Name":"OUISRANI","Education level":"Bac +2","Affiliation":"LYMED","P1":"8","P2":"0","P3":"0","P4":"0","DAY 1":"8","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"8"},
  {"Candidate - ID":"25074","First Name":"Salmane","Last Name":"Chuiaj","Education level":"Bac +1","Affiliation":"Lycée Méditerranéen","P1":"8","P2":"0","P3":"0","P4":"0","DAY 1":"8","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"8"}
  ,
  {"Candidate - ID":"25063","First Name":"Brahim","Last Name":"Bousselham","Education level":"Bac +2","Affiliation":"IBN TIMIYA","P1":"7","P2":"0","P3":"0","P4":"0","DAY 1":"7","P5":"0","P6":"0","P7":"0","P8":"1","DAY 2":"1","Total":"8"},
  {"Candidate - ID":"25035","First Name":"Amine","Last Name":"Belhachmi","Education level":"Bac +2","Affiliation":"Omar Ibn AL-Khattab","P1":"6","P2":"0","P3":"0","P4":"0","DAY 1":"6","P5":"0","P6":"1","P7":"0","P8":"1","DAY 2":"2","Total":"8"},
  {"Candidate - ID":"25025","First Name":"Yasser","Last Name":"Assaraji","Education level":"Bac +1","Affiliation":"Lycee salman al farissi","P1":"8","P2":"0","P3":"0","P4":"0","DAY 1":"8","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"8"},
  {"Candidate - ID":"25180","First Name":"NACIR","Last Name":"MOHAMMED AMINE","Education level":"Bac +2","Affiliation":"Lymed","P1":"6","P2":"0","P3":"0","P4":"0","DAY 1":"6","P5":"0","P6":"1","P7":"0","P8":"0","DAY 2":"1","Total":"7"},
  {"Candidate - ID":"25160","First Name":"MOUAD","Last Name":"EL AATABI","Education level":"Bac +3","Affiliation":"INSEA","P1":"7","P2":"0","P3":"0","P4":"0","DAY 1":"7","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"7"},
  {"Candidate - ID":"25122","First Name":"Adam","Last Name":"Haissane","Education level":"Bac +2","Affiliation":"Lymed","P1":"7","P2":"0","P3":"0","P4":"0","DAY 1":"7","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"7"},
  {"Candidate - ID":"25101","First Name":"Oussama","Last Name":"Lamhadoul","Education level":"Bac +4","Affiliation":"FSSM","P1":"7","P2":"0","P3":"0","P4":"0","DAY 1":"7","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"7"},
  {"Candidate - ID":"25072","First Name":"Yasmine","Last Name":"CHARIF","Education level":"Bac +1","Affiliation":"Lycée Mohamed 6 d’excellence","P1":"6","P2":"0","P3":"0","P4":"0","DAY 1":"6","P5":"0","P6":"0","P7":"0","P8":"1","DAY 2":"1","Total":"7"}
  ,
  {"Candidate - ID":"25183","First Name":"Aymen","Last Name":"Mrini","Education level":"Bac +2","Affiliation":"Lymed","P1":"6","P2":"0","P3":"0","P4":"0","DAY 1":"6","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"6"},
  {"Candidate - ID":"25178","First Name":"Malak","Last Name":"Milib","Education level":"Bac +2","Affiliation":"ABULCASIS","P1":"6","P2":"0","P3":"0","P4":"0","DAY 1":"6","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"6"},
  {"Candidate - ID":"25174","First Name":"Saif-Eddine","Last Name":"Mehrach","Education level":"Bac +2","Affiliation":"Al zahrawi","P1":"6","P2":"0","P3":"0","P4":"0","DAY 1":"6","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"6"},
  {"Candidate - ID":"25125","First Name":"AMJAD","Last Name":"HANAFI","Education level":"Bac +2","Affiliation":"Lycée Mohammed VI d’Excellence LM6E","P1":"6","P2":"0","P3":"0","P4":"0","DAY 1":"6","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"6"}
  ,
  {"Candidate - ID":"25080","First Name":"Yassir","Last Name":"Douraid","Education level":"Bac +2","Affiliation":"LYMED","P1":"2","P2":"0","P3":"0","P4":"0","DAY 1":"2","P5":"3","P6":"1","P7":"0","P8":"0","DAY 2":"4","Total":"6"},
  {"Candidate - ID":"25026","First Name":"Ismail","Last Name":"Atif","Education level":"Bac +1","Affiliation":"Lymed","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"6","P6":"0","P7":"0","P8":"0","DAY 2":"6","Total":"6"},
  {"Candidate - ID":"25024","First Name":"HAMZA","Last Name":"ASSAM","Education level":"Bac +2","Affiliation":"LYMED","P1":"0","P2":"3","P3":"2","P4":"0","DAY 1":"5","P5":"0","P6":"0","P7":"0","P8":"1","DAY 2":"1","Total":"6"},
  {"Candidate - ID":"25218","First Name":"Salma","Last Name":"Zouhair","Education level":"Bac +1","Affiliation":"BENGHAZI","P1":"4","P2":"0","P3":"0","P4":"0","DAY 1":"4","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"4"},
  {"Candidate - ID":"25163","First Name":"Yazid","Last Name":"Machach","Education level":"Bac +1","Affiliation":"Moulay Youssef","P1":"4","P2":"0","P3":"0","P4":"0","DAY 1":"4","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"4"},
  {"Candidate - ID":"25210","First Name":"Anas","Last Name":"Taljaoui","Education level":"Bac +1","Affiliation":"Lymed","P1":"2","P2":"0","P3":"0","P4":"0","DAY 1":"2","P5":"0","P6":"0","P7":"1","P8":"0","DAY 2":"1","Total":"3"},
  {"Candidate - ID":"25177","First Name":"El Amraoui","Last Name":"Haytham","Education level":"Bac +1","Affiliation":"Cpge omar ibn al-khattab","P1":"2","P2":"0","P3":"0","P4":"0","DAY 1":"2","P5":"0","P6":"0","P7":"0","P8":"1","DAY 2":"1","Total":"3"},
  {"Candidate - ID":"25171","First Name":"Abdennour","Last Name":"Mazouzi","Education level":"Bac +1","Affiliation":"CPGE MOhammed V","P1":"2","P2":"0","P3":"0","P4":"0","DAY 1":"2","P5":"0","P6":"0","P7":"0","P8":"1","DAY 2":"1","Total":"3"},
  {"Candidate - ID":"25136","First Name":"Elghali","Last Name":"Idrissi Kaitouni","Education level":"Bac +1","Affiliation":"Cpge omar ibn al-khattab","P1":"2","P2":"0","P3":"0","P4":"0","DAY 1":"2","P5":"0","P6":"1","P7":"0","P8":"0","DAY 2":"1","Total":"3"},
  {"Candidate - ID":"25120","First Name":"Ayoub","Last Name":"Guenbib","Education level":"Bac +2","Affiliation":"Zahrawi","P1":"2","P2":"1","P3":"0","P4":"0","DAY 1":"3","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"3"},
  {"Candidate - ID":"25119","First Name":"nabil","Last Name":"griech","Education level":"Bac +1","Affiliation":"cpge mohammed V","P1":"1","P2":"0","P3":"2","P4":"0","DAY 1":"3","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"3"},
  {"Candidate - ID":"25095","First Name":"Mouad","Last Name":"EL khaili","Education level":"Bac +2","Affiliation":"Marrakech prepas","P1":"2","P2":"0","P3":"0","P4":"0","DAY 1":"2","P5":"0","P6":"1","P7":"0","P8":"0","DAY 2":"1","Total":"3"},
  {"Candidate - ID":"25070","First Name":"Zakaria","Last Name":"Chaibi","Education level":"Bac +1","Affiliation":"Lycée d'excellence Mohammed VI","P1":"2","P2":"0","P3":"0","P4":"0","DAY 1":"2","P5":"0","P6":"0","P7":"0","P8":"1","DAY 2":"1","Total":"3"}
  ,
  {"Candidate - ID":"25212","First Name":"KHANA","Last Name":"YASSINE","Education level":"Bac +1","Affiliation":"Omar Ibno Abd ALAZIZ","P1":"2","P2":"0","P3":"0","P4":"0","DAY 1":"2","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"2"},
  {"Candidate - ID":"25196","First Name":"noura","Last Name":"Riahi el idrissi","Education level":"Bac +1","Affiliation":"Universite Mohamed 6 polytechnique","P1":"2","P2":"0","P3":"0","P4":"0","DAY 1":"2","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"2"},
  {"Candidate - ID":"25189","First Name":"tarik","Last Name":"ouabrk","Education level":"Bac +2","Affiliation":"UM6P benguerir","P1":"2","P2":"0","P3":"0","P4":"0","DAY 1":"2","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"2"},
  {"Candidate - ID":"25188","First Name":"Mouhcine","Last Name":"OIHACH","Education level":"Bac +2","Affiliation":"ENS (Université Sultan Moulay Slimane beni mellal)","P1":"2","P2":"0","P3":"0","P4":"0","DAY 1":"2","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"2"}
  ,
  {"Candidate - ID":"25179","First Name":"Ennougaoui","Last Name":"Mohammed","Education level":"Bac +2","Affiliation":"Lycee Omar Ibn Abdelaziz OUJDA","P1":"2","P2":"0","P3":"0","P4":"0","DAY 1":"2","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"2"},
  {"Candidate - ID":"25175","First Name":"Youssef","Last Name":"MEHREZ","Education level":"Bac +1","Affiliation":"ENSA Ibn Tofail University","P1":"2","P2":"0","P3":"0","P4":"0","DAY 1":"2","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"2"},
  {"Candidate - ID":"25164","First Name":"Chaima","Last Name":"Mafamane","Education level":"Bac +1","Affiliation":"Lycée Reda slaoui","P1":"0","P2":"0","P3":"2","P4":"0","DAY 1":"2","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"2"}
  ,
  {"Candidate - ID":"25152","First Name":"Sara","Last Name":"LAKHBALAT","Education level":"Bac +1","Affiliation":"Cpge Moulay youssef","P1":"2","P2":"0","P3":"0","P4":"0","DAY 1":"2","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"2"},
  {"Candidate - ID":"25128","First Name":"Bzikha","Last Name":"Hiba","Education level":"Bac +1","Affiliation":"lymed","P1":"2","P2":"0","P3":"0","P4":"0","DAY 1":"2","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"2"},
  {"Candidate - ID":"25113","First Name":"Abir","Last Name":"Fakhreddine","Education level":"Bac +1","Affiliation":"UM6P College Of Computing","P1":"2","P2":"0","P3":"0","P4":"0","DAY 1":"2","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"2"},
  {"Candidate - ID":"25108","First Name":"Ahmed","Last Name":"Ennassib","Education level":"Bac +1","Affiliation":"Um6p college of computing","P1":"2","P2":"0","P3":"0","P4":"0","DAY 1":"2","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"2"},
  {"Candidate - ID":"25105","First Name":"Alae","Last Name":"Elmahdaoui","Education level":"Bac +2","Affiliation":"Um6p college of computing","P1":"1","P2":"0","P3":"0","P4":"0","DAY 1":"1","P5":"0","P6":"0","P7":"0","P8":"1","DAY 2":"1","Total":"2"},
  {"Candidate - ID":"25104","First Name":"Hamid","Last Name":"Elhanouni","Education level":"Bac +1","Affiliation":"Moulay Youssef","P1":"1","P2":"0","P3":"0","P4":"0","DAY 1":"1","P5":"0","P6":"1","P7":"0","P8":"0","DAY 2":"1","Total":"2"},
  {"Candidate - ID":"25096","First Name":"Mostapha","Last Name":"El khyari","Education level":"Bac +1","Affiliation":"Lycée Mohammed 6","P1":"2","P2":"0","P3":"0","P4":"0","DAY 1":"2","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"2"}
  ,
  {"Candidate - ID":"25091","First Name":"ISMAIL","Last Name":"EL HLIMI","Education level":"Bac +1","Affiliation":"LM6E BENGURIR","P1":"2","P2":"0","P3":"0","P4":"0","DAY 1":"2","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"2"},
  {"Candidate - ID":"25088","First Name":"ANAS","Last Name":"EL HAMIL","Education level":"Bac +1","Affiliation":"LYDEX","P1":"2","P2":"0","P3":"0","P4":"0","DAY 1":"2","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"2"},
  {"Candidate - ID":"25077","First Name":"Anas","Last Name":"IDLAFQIH","Education level":"Engineering School post-CPGE","Affiliation":"","P1":"2","P2":"0","P3":"0","P4":"0","DAY 1":"2","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"2"},
  {"Candidate - ID":"25069","First Name":"Hiba","Last Name":"CHAALI","Education level":"Bac +1","Affiliation":"CPGE OMAR IBN AL-KHATTAB","P1":"2","P2":"0","P3":"0","P4":"0","DAY 1":"2","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"2"},
  {"Candidate - ID":"25065","First Name":"Ranya","Last Name":"Boutara","Education level":"Bac +1","Affiliation":"Lycée Mohammed 6 d'Excellence (lydex)","P1":"2","P2":"0","P3":"0","P4":"0","DAY 1":"2","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"2"}
  ,
  {"Candidate - ID":"25062","First Name":"Adam","Last Name":"Bouskri","Education level":"Bac +1","Affiliation":"CARNOT PREPAS","P1":"2","P2":"0","P3":"0","P4":"0","DAY 1":"2","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"2"},
  {"Candidate - ID":"25045","First Name":"Yassine","Last Name":"Bennani","Education level":"Bac +2","Affiliation":"Lm6e","P1":"0","P2":"1","P3":"0","P4":"0","DAY 1":"1","P5":"0","P6":"0","P7":"0","P8":"1","DAY 2":"1","Total":"2"},
  {"Candidate - ID":"25011","First Name":"Soufiane","Last Name":"AIT LHADJ","Education level":"Bac +3","Affiliation":"UM6P-College of Computing","P1":"2","P2":"0","P3":"0","P4":"0","DAY 1":"2","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"2"},
  {"Candidate - ID":"25190","First Name":"Mohamed taha","Last Name":"Ouazzani tayebi","Education level":"Bac +1","Affiliation":"Iben ghazi","P1":"1","P2":"0","P3":"0","P4":"0","DAY 1":"1","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"1"},
  {"Candidate - ID":"25151","First Name":"MOUAD","Last Name":"LAKHAL","Education level":"Bac +2","Affiliation":"Lycée Mohammed VI d'excellence","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"1","P7":"0","P8":"0","DAY 2":"1","Total":"1"}
  ,
  {"Candidate - ID":"25147","First Name":"Adam","Last Name":"Kherbach","Education level":"Bac +1","Affiliation":"Lycée Al-Zahrawi","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"1","P7":"0","P8":"0","DAY 2":"1","Total":"1"}
  ,
  {"Candidate - ID":"25140","First Name":"Malak","Last Name":"Kaina","Education level":"Bac +1","Affiliation":"Lycee Mohammed 6 D'Excellence","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"1","P7":"0","P8":"0","DAY 2":"1","Total":"1"},
  {"Candidate - ID":"25138","First Name":"Hicham","Last Name":"JELLAL","Education level":"Bac +1","Affiliation":"Lycée d’excellence Mohammed VI","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"1","DAY 2":"1","Total":"1"}
  ,
  {"Candidate - ID":"25131","First Name":"Yahya","Last Name":"Hmito","Education level":"Bac +2","Affiliation":"Cpge moulay abdellah safi","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"1","P8":"0","DAY 2":"1","Total":"1"},
  {"Candidate - ID":"25127","First Name":"Mohammed Rida","Last Name":"Henaqobba","Education level":"Bac +1","Affiliation":"CPGE Moulay Youssef Rabat","P1":"1","P2":"0","P3":"0","P4":"0","DAY 1":"1","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"1"},
  {"Candidate - ID":"25100","First Name":"MOHAMED YASSINE","Last Name":"EL OUARGUI","Education level":"Bac +1","Affiliation":"Institut agronomique et vétérinaire Hassan II","P1":"1","P2":"0","P3":"0","P4":"0","DAY 1":"1","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"1"}
  ,
  {"Candidate - ID":"25068","First Name":"Mohammed-Adam","Last Name":"Bsir","Education level":"Bac +1","Affiliation":"Lycée Moulay Youssef","P1":"1","P2":"0","P3":"0","P4":"0","DAY 1":"1","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"1"}
  ,
  {"Candidate - ID":"25061","First Name":"Mohamed","Last Name":"Bourzama","Education level":"Bac +1","Affiliation":"Lycee Moulay Ali Cherif Errachidia","P1":"1","P2":"0","P3":"0","P4":"0","DAY 1":"1","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"1"},
  {"Candidate - ID":"25039","First Name":"Amine","Last Name":"Benatti","Education level":"Bac +3","Affiliation":"Ecole des Sciences de l'Information","P1":"1","P2":"0","P3":"0","P4":"0","DAY 1":"1","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"1"},
  {"Candidate - ID":"25019","First Name":"KHALID","Last Name":"AMHAOUCH","Education level":"Bac +1","Affiliation":"Ecole Royale de l'Air","P1":"1","P2":"0","P3":"0","P4":"0","DAY 1":"1","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"1"},
  {"Candidate - ID":"25220","First Name":"Salim","Last Name":"ZYANE","Education level":"Bac +2","Affiliation":"Lycée Al Zahrawi","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"}
  ,
  {"Candidate - ID":"25219","First Name":"Nabil","Last Name":"Zrhdidi","Education level":"Bac +2","Affiliation":"Moulay youssef","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25217","First Name":"Marouane","Last Name":"ZEMRANI","Education level":"Bac +3","Affiliation":"EMINES-UM6P","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25211","First Name":"nadia","Last Name":"wadou","Education level":"Bac +2","Affiliation":"lycée omar ibn al khttab","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"}
  ,
  {"Candidate - ID":"25207","First Name":"Lina","Last Name":"Souhail","Education level":"Bac +1","Affiliation":"LYMED","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25204","First Name":"Abdollah","Last Name":"Sbihi","Education level":"Bac +1","Affiliation":"CPGE Moulay Driss","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25201","First Name":"SALMA","Last Name":"SAJID","Education level":"Bac +1","Affiliation":"Lycée ibn timiya","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"}
  ,
  {"Candidate - ID":"25200","First Name":"Mariam","Last Name":"Said","Education level":"Bac +1","Affiliation":"College of computing","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25198","First Name":"Marwa","Last Name":"Sabidi","Education level":"Bac +1","Affiliation":"Faculté des sciences semlaliya","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"}
  ,
  {"Candidate - ID":"25193","First Name":"Haitam-Safouane","Last Name":"Ourtane","Education level":"Bac +2","Affiliation":"LM6E","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25181","First Name":"ANASS","Last Name":"MOUKTAOUI","Education level":"Bac +3","Affiliation":"ecole hassania des travaux publics - EHTP","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25172","First Name":"Najim","Last Name":"Mehdi","Education level":"Bac +3","Affiliation":"Moulay ismail university","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25169","First Name":"SLIMANE","Last Name":"MARSLI","Education level":"Bac +1","Affiliation":"ENSAM RABAT","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25168","First Name":"ilyas","Last Name":"aadidil","Education level":"Bac +1","Affiliation":"Lycée Reda Slaoui","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"}
  ,
  {"Candidate - ID":"25159","First Name":"IMRANE","Last Name":"LOUKILIA","Education level":"Bac +2","Affiliation":"Lycée Mohammed VI d’Excellence","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"}
  ,
  {"Candidate - ID":"25158","First Name":"Wessal","Last Name":"Loubat","Education level":"Bac +2","Affiliation":"Lymed","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25157","First Name":"Khalil","Last Name":"Lembarki","Education level":"Bac +1","Affiliation":"First prepa","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25156","First Name":"Khadija","Last Name":"Lekbiri","Education level":"Bac +2","Affiliation":"UM6P College Of Computing","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25155","First Name":"Chady","Last Name":"Latifi","Education level":"Bac +2","Affiliation":"lycée technique mohammedia","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"}
  ,
  {"Candidate - ID":"25150","First Name":"Mohamed Rayan","Last Name":"Labgoul","Education level":"Bac +1","Affiliation":"Cpge Mohamed 5 casablanca","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25148","First Name":"anas","Last Name":"koujout","Education level":"Bac +2","Affiliation":"LYDEX","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25146","First Name":"Oubay","Last Name":"Kharabo","Education level":"Bac +3","Affiliation":"ENSAM - Meknès","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"}
  ,
  {"Candidate - ID":"25143","First Name":"wassim","Last Name":"kettari","Education level":"Bac +3","Affiliation":"faculté des sciences et techniques errachidia","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"}
  ,
  {"Candidate - ID":"25135","First Name":"MOUAD","Last Name":"ID KAROUM","Education level":"Bac +4","Affiliation":"ENSA AGADIR","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25126","First Name":"Zaid","Last Name":"HARRAK","Education level":"Bac +2","Affiliation":"Lycée Méditerranéen, LYMED","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"}
  ,
  {"Candidate - ID":"25121","First Name":"Mohamed Amine","Last Name":"Hadi","Education level":"Bac +3","Affiliation":"université de Strasbourg","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"}
  ,
  {"Candidate - ID":"25114","First Name":"RAYANE","Last Name":"FAOUZI","Education level":"Bac +1","Affiliation":"UNIVERSITY SULTAN MOULAY SLIMANE (USMS)","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25112","First Name":"imrane","Last Name":"jalal mansour","Education level":"Bac +1","Affiliation":"Moulay youssef","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25110","First Name":"Youssef","Last Name":"Essaidi","Education level":"Bac +2","Affiliation":"Lymed","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25109","First Name":"Aziz","Last Name":"Essabir","Education level":"Bac +2","Affiliation":"Lycée méditerranéen - Lymed","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"}
  ,
  {"Candidate - ID":"25103","First Name":"Taha","Last Name":"Elaballaoui","Education level":"Bac +1","Affiliation":"Fstt","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25097","First Name":"Salah Eddine","Last Name":"EL Majouti","Education level":"Bac +2","Affiliation":"CPGE Moulay Youssef","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25093","First Name":"Achraf","Last Name":"El KALAI","Education level":"Bac +1","Affiliation":"CPGE OUJDA","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25092","First Name":"BADR EDDINE","Last Name":"EL KADIRI BOUTCHICH","Education level":"Bac +1","Affiliation":"Al Akhawayn University","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25086","First Name":"Ibrahim","Last Name":"El gharbaoui","Education level":"Bac +2","Affiliation":"lycee mohammed 6","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25079","First Name":"Youssef","Last Name":"Demghart","Education level":"Bac +2","Affiliation":"Lycée Méditerranéen - LYMED","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"}
  ,
  {"Candidate - ID":"25078","First Name":"Zineb","Last Name":"DAROUICHI","Education level":"Bac +3","Affiliation":"Ecole Hassania des Travaux Publics (EHTP)","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25075","First Name":"Aymane","Last Name":"Dahbi","Education level":"Bac +1","Affiliation":"Lycée Pierre de Fermat","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"}
  ,
  {"Candidate - ID":"25071","First Name":"Mouad","Last Name":"Chaker","Education level":"Bac +2","Affiliation":"Lycée mohammed VI d'excellence - Casablanca","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"}
  ,
  {"Candidate - ID":"25067","First Name":"Sami","Last Name":"Broumi","Education level":"Bac +1","Affiliation":"ENSAM Rabat","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25057","First Name":"YAHYA","Last Name":"BOUJANOUI","Education level":"Bac +4","Affiliation":"ENSAM MEKNES","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25055","First Name":"Oumayma","Last Name":"BOUHAFS","Education level":"Bac +1","Affiliation":"LM6E","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25053","First Name":"Mohamed","Last Name":"Boudouh","Education level":"Bac +3","Affiliation":"Télécom Paris","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"}
  ,
  {"Candidate - ID":"25051","First Name":"Douae","Last Name":"Bouayadi","Education level":"Bac +1","Affiliation":"UM6P","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25050","First Name":"Marouane","Last Name":"Boallal","Education level":"Bac +2","Affiliation":"Université Moulay Ismaïl","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"}
  ,
  {"Candidate - ID":"25046","First Name":"Ismail","Last Name":"Bennani","Education level":"Bac +2","Affiliation":"LEM6","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25041","First Name":"LAHSSINI","Last Name":"Aymane","Education level":"Bac +2","Affiliation":"LYCEE MOHAMED VI DEXELLENCE DE BENGUERRIR (LM6E)","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25040","First Name":"Hiba","Last Name":"Benbakhta","Education level":"Bac +1","Affiliation":"UM6P","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25037","First Name":"Alae","Last Name":"Ben Azouz","Education level":"Bac +2","Affiliation":"CPGE Moulay Idriss","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25031","First Name":"Abdelhakim","Last Name":"Benatti","Education level":"Bac +3","Affiliation":"ESI","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25030","First Name":"Othmane","Last Name":"Azoubi","Education level":"Bac +3","Affiliation":"UM6P - CC","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25029","First Name":"abid","Last Name":"ayoub","Education level":"Bac +1","Affiliation":"Omar ibn al khattab","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25017","First Name":"LARHROTI","Last Name":"Amal","Education level":"Bac +3","Affiliation":"FSTE","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25015","First Name":"Mohamed faissal","Last Name":"Ajja","Education level":"Bac +1","Affiliation":"Cpge Moulay Youssef","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25013","First Name":"Hamza","Last Name":"AIT OUSSOUS","Education level":"Bac +1","Affiliation":"CPGE IBN ABDOUNE","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25012","First Name":"Adam","Last Name":"Ait Mouse","Education level":"Bac +1","Affiliation":"CPGE lycee technique Mohammed 5 Beni Mellal","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25010","First Name":"Amine","Last Name":"Ait Hamma","Education level":"Bac +4","Affiliation":"Ibn Zohr University - ENSA Agadir","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25007","First Name":"ilyas","Last Name":"Ahalmou","Education level":"Bac +1","Affiliation":"University ibn Tofail","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25006","First Name":"YASSINE","Last Name":"AHALMOU","Education level":"Bac +2","Affiliation":"SALMANE AL FARISSI","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25003","First Name":"Badredine","Last Name":"Abdelkhalek","Education level":"Bac +1","Affiliation":"Lycée d'excellence Bengrir","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"}
  ,
  {"Candidate - ID":"25002","First Name":"Youssef","Last Name":"ABBAD ANDALOUSSI","Education level":"Bac +2","Affiliation":"Omar Ibn Al Khattab","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"},
  {"Candidate - ID":"25001","First Name":"Mohammed","Last Name":"AATOU","Education level":"Bac +3","Affiliation":"Université moulay ismail - FSTE","P1":"0","P2":"0","P3":"0","P4":"0","DAY 1":"0","P5":"0","P6":"0","P7":"0","P8":"0","DAY 2":"0","Total":"0"}
  
  ]

  export default results;