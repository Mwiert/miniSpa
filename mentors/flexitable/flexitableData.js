const data = [
  {
    studentID: '12345678',
    status: 'active',
    nameSurname: 'Ahmet Yılmaz',
    class: '1st year',
    birthDate: '15.08.2010',
    gender: 'Male',
    department: 'Computer Science',
    annualFee: '3000 EUR',
    city: 'Istanbul',
    highSchoolGPA: 4.0,
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    email: 'ahmet.yilmaz@computersci.com'
  },
  {
    studentID: '23456789',
    status: 'graduate',
    nameSurname: 'Ayşe Kaya',
    class: 'graduate',
    birthDate: '12.06.1996',
    gender: 'Female',
    department: 'Information Systems',
    annualFee: '0 EUR',
    city: 'Ankara',
    highSchoolGPA: 3.8,
    photo: 'https://randomuser.me/api/portraits/women/2.jpg',
    email: 'ayse.kaya@infosystems.org'
  },
  {
    studentID: '34567890',
    status: 'pending',
    nameSurname: 'Mehmet Demir',
    class: '2nd year',
    birthDate: '25.09.2001',
    gender: 'Male',
    department: 'Software Engineering',
    annualFee: '3200 EUR',
    city: 'Izmir',
    highSchoolGPA: 3.6,
    photo: 'https://randomuser.me/api/portraits/men/3.jpg',
    email: 'mehmet.demir@softeng.edu'
  },
  {
    studentID: '45678901',
    status: 'active',
    nameSurname: 'Elif Şahin',
    class: '3rd year',
    birthDate: '30.01.2000',
    gender: 'Female',
    department: 'Computer Engineering',
    annualFee: '3400 EUR',
    city: 'Bursa',
    highSchoolGPA: 3.9,
    photo: 'https://randomuser.me/api/portraits/women/4.jpg',
    email: 'elif.sahin@compeng.com'
  },
  {
    studentID: '56789012',
    status: 'graduate',
    nameSurname: 'Ali Çelik',
    class: 'graduate',
    birthDate: '11.11.1997',
    gender: 'Male',
    department: 'Management Inf Systems',
    annualFee: '0 EUR',
    city: 'Antalya',
    highSchoolGPA: 3.5,
    photo: 'https://randomuser.me/api/portraits/men/5.jpg',
    email: 'ali.celik@misystems.org'
  },
  {
    studentID: '67890123',
    status: 'active',
    nameSurname: 'Fatma Aksoy',
    class: '4th year',
    birthDate: '02.03.1999',
    gender: 'Female',
    department: 'Data Science',
    annualFee: '3600 EUR',
    city: 'Adana',
    highSchoolGPA: 3.7,
    photo: 'https://randomuser.me/api/portraits/women/6.jpg',
    email: 'fatma.aksoy@datasci.edu'
  },
  {
    studentID: '78901234',
    status: 'pending',
    nameSurname: 'Mustafa Korkmaz',
    class: '1st year',
    birthDate: '17.07.2002',
    gender: 'Male',
    department: 'Artificial Intelligence',
    annualFee: '3000 EUR',
    city: 'Gaziantep',
    highSchoolGPA: 3.4,
    photo: 'https://randomuser.me/api/portraits/men/7.jpg',
    email: 'mustafa.korkmaz@ai.org'
  },
  {
    studentID: '89012345',
    status: 'active',
    nameSurname: 'Zeynep Yıldız',
    class: '2nd year',
    birthDate: '09.12.2001',
    gender: 'Female',
    department: 'Cyber Security',
    annualFee: '3200 EUR',
    city: 'Konya',
    highSchoolGPA: 3.8,
    photo: 'https://randomuser.me/api/portraits/women/8.jpg',
    email: 'zeynep.yildiz@cybersec.com'
  },
  {
    studentID: '90123456',
    status: 'graduate',
    nameSurname: 'Murat Öz',
    class: 'graduate',
    birthDate: '22.05.1996',
    gender: 'Male',
    department: 'Information Technology',
    annualFee: '0 EUR',
    city: 'Kayseri',
    highSchoolGPA: 3.6,
    photo: 'https://randomuser.me/api/portraits/men/9.jpg',
    email: 'murat.oz@it.org'
  },
  {
    studentID: '11234567',
    status: 'pending',
    nameSurname: 'Selin Aydın',
    class: '3rd year',
    birthDate: '05.10.2000',
    gender: 'Female',
    department: 'Network Engineering',
    annualFee: '3400 EUR',
    city: 'Mersin',
    highSchoolGPA: 3.9,
    photo: 'https://randomuser.me/api/portraits/women/10.jpg',
    email: 'selin.aydin@networkeng.edu'
  },
  {
    studentID: '22345678',
    status: 'active',
    nameSurname: 'Kemal Çetin',
    class: '1st year',
    birthDate: '18.04.2011',
    gender: 'Male',
    department: 'Robotics',
    annualFee: '3100 EUR',
    city: 'Samsun',
    highSchoolGPA: 3.7,
    photo: 'https://randomuser.me/api/portraits/men/11.jpg',
    email: 'kemal.cetin@robotics.org'
  },
  {
    studentID: '33456789',
    status: 'graduate',
    nameSurname: 'Leyla Uysal',
    class: 'graduate',
    birthDate: '23.03.1995',
    gender: 'Female',
    department: 'Bioinformatics',
    annualFee: '0 EUR',
    city: 'Trabzon',
    highSchoolGPA: 3.8,
    photo: 'https://randomuser.me/api/portraits/women/12.jpg',
    email: 'leyla.uysal@bioinfo.com'
  },
  {
    studentID: '44567890',
    status: 'pending',
    nameSurname: 'Can Demir',
    class: '2nd year',
    birthDate: '29.08.2002',
    gender: 'Male',
    department: 'Data Science',
    annualFee: '3300 EUR',
    city: 'Eskisehir',
    highSchoolGPA: 3.5,
    photo: 'https://randomuser.me/api/portraits/men/13.jpg',
    email: 'can.demir@datasci.org'
  },
  {
    studentID: '55678901',
    status: 'active',
    nameSurname: 'Sevim Çelik',
    class: '3rd year',
    birthDate: '07.05.2001',
    gender: 'Female',
    department: 'Quantum Computing',
    annualFee: '3500 EUR',
    city: 'Diyarbakir',
    highSchoolGPA: 4.0,
    photo: 'https://randomuser.me/api/portraits/women/14.jpg',
    email: 'sevim.celik@quantumcomp.edu'
  },
  {
    studentID: '66789012',
    status: 'graduate',
    nameSurname: 'Bora Aydın',
    class: 'graduate',
    birthDate: '19.11.1998',
    gender: 'Male',
    department: 'Cyber Security',
    annualFee: '0 EUR',
    city: 'Sivas',
    highSchoolGPA: 3.7,
    photo: 'https://randomuser.me/api/portraits/men/15.jpg',
    email: 'bora.aydin@cybersec.org'
  },
  {
    studentID: '77890123',
    status: 'active',
    nameSurname: 'Aylin Erdem',
    class: '4th year',
    birthDate: '14.06.2000',
    gender: 'Female',
    department: 'Software Engineering',
    annualFee: '3700 EUR',
    city: 'Van',
    highSchoolGPA: 3.9,
    photo: 'https://randomuser.me/api/portraits/women/16.jpg',
    email: 'aylin.erdem@softeng.com'
  },
  {
    studentID: '88901234',
    status: 'pending',
    nameSurname: 'Mert Yılmaz',
    class: '1st year',
    birthDate: '21.09.2003',
    gender: 'Male',
    department: 'Computer Science',
    annualFee: '3000 EUR',
    city: 'Malatya',
    highSchoolGPA: 3.5,
    photo: 'https://randomuser.me/api/portraits/men/17.jpg',
    email: 'mert.yilmaz@computersci.edu'
  },
  {
    studentID: '99012345',
    status: 'active',
    nameSurname: 'Nazlı Kurt',
    class: '2nd year',
    birthDate: '15.02.2002',
    gender: 'Female',
    department: 'Information Systems',
    annualFee: '3200 EUR',
    city: 'Adiyaman',
    highSchoolGPA: 3.8,
    photo: 'https://randomuser.me/api/portraits/women/18.jpg',
    email: 'nazli.kurt@infosystems.com'
  },
  {
    studentID: '10123456',
    status: 'graduate',
    nameSurname: 'Emre Özdemir',
    class: 'graduate',
    birthDate: '02.12.1996',
    gender: 'Male',
    department: 'Artificial Intelligence',
    annualFee: '0 EUR',
    city: 'Batman',
    highSchoolGPA: 3.7,
    photo: 'https://randomuser.me/api/portraits/men/19.jpg',
    email: 'emre.ozdemir@ai.edu'
  },
  {
    studentID: '21234567',
    status: 'pending',
    nameSurname: 'Esra Kılıç',
    class: '3rd year',
    birthDate: '27.03.2000',
    gender: 'Female',
    department: 'Management Inf Systems',
    annualFee: '3400 EUR',
    city: 'Balikesir',
    highSchoolGPA: 3.9,
    photo: 'https://randomuser.me/api/portraits/women/20.jpg',
    email: 'esra.kilic@misystems.org'
  },
  {
    studentID: '32345678',
    status: 'active',
    nameSurname: 'Hakan Aksoy',
    class: '1st year',
    birthDate: '03.08.2011',
    gender: 'Male',
    department: 'Bioinformatics',
    annualFee: '3100 EUR',
    city: 'Manisa',
    highSchoolGPA: 3.8,
    photo: 'https://randomuser.me/api/portraits/men/21.jpg',
    email: 'hakan.aksoy@bioinfo.edu'
  },
  {
    studentID: '43456789',
    status: 'graduate',
    nameSurname: 'Derya Kılıç',
    class: 'graduate',
    birthDate: '15.05.1995',
    gender: 'Female',
    department: 'Quantum Computing',
    annualFee: '0 EUR',
    city: 'Hatay',
    highSchoolGPA: 3.7,
    photo: 'https://randomuser.me/api/portraits/women/22.jpg',
    email: 'derya.kilic@quantumcomp.org'
  },
  {
    studentID: '54567890',
    status: 'pending',
    nameSurname: 'Onur Çetin',
    class: '2nd year',
    birthDate: '19.04.2002',
    gender: 'Male',
    department: 'Network Engineering',
    annualFee: '3300 EUR',
    city: 'K. Maraş',
    highSchoolGPA: 3.5,
    photo: 'https://randomuser.me/api/portraits/men/23.jpg',
    email: 'onur.cetin@networkeng.com'
  },
  {
    studentID: '65678901',
    status: 'active',
    nameSurname: 'Ece Şahin',
    class: '3rd year',
    birthDate: '29.07.2001',
    gender: 'Female',
    department: 'Robotics',
    annualFee: '3500 EUR',
    city: 'Kirikkale',
    highSchoolGPA: 4.0,
    photo: 'https://randomuser.me/api/portraits/women/24.jpg',
    email: 'ece.sahin@robotics.org'
  },
  {
    studentID: '76789012',
    status: 'graduate',
    nameSurname: 'Kerem Yıldız',
    class: 'graduate',
    birthDate: '12.10.1998',
    gender: 'Male',
    department: 'Computer Science',
    annualFee: '0 EUR',
    city: 'Kocaeli',
    highSchoolGPA: 3.7,
    photo: 'https://randomuser.me/api/portraits/men/25.jpg',
    email: 'kerem.yildiz@computersci.edu'
  },
  {
    studentID: '87890123',
    status: 'active',
    nameSurname: 'Sibel Uysal',
    class: '4th year',
    birthDate: '10.11.2000',
    gender: 'Female',
    department: 'Cyber Security',
    annualFee: '3700 EUR',
    city: 'Mugla',
    highSchoolGPA: 3.9,
    photo: 'https://randomuser.me/api/portraits/women/26.jpg',
    email: 'sibel.uysal@cybersec.org'
  },
  {
    studentID: '98901234',
    status: 'pending',
    nameSurname: 'Burak Erdem',
    class: '1st year',
    birthDate: '25.02.2003',
    gender: 'Male',
    department: 'Data Science',
    annualFee: '3000 EUR',
    city: 'Sanliurfa',
    highSchoolGPA: 3.5,
    photo: 'https://randomuser.me/api/portraits/men/27.jpg',
    email: 'burak.erdem@datasci.com'
  },
  {
    studentID: '10912345',
    status: 'active',
    nameSurname: 'Gizem Kaya',
    class: '2nd year',
    birthDate: '20.05.2002',
    gender: 'Female',
    department: 'Information Technology',
    annualFee: '3200 EUR',
    city: 'Tekirdag',
    highSchoolGPA: 3.8,
    photo: 'https://randomuser.me/api/portraits/women/28.jpg',
    email: 'gizem.kaya@it.edu'
  },
  {
    studentID: '11023456',
    status: 'graduate',
    nameSurname: 'Okan Öz',
    class: 'graduate',
    birthDate: '18.07.1996',
    gender: 'Male',
    department: 'Software Engineering',
    annualFee: '0 EUR',
    city: 'Canakkale',
    highSchoolGPA: 3.7,
    photo: 'https://randomuser.me/api/portraits/men/29.jpg',
    email: 'okan.oz@softeng.com'
  },
  {
    studentID: '12123457',
    status: 'pending',
    nameSurname: 'Pelin Demir',
    class: '3rd year',
    birthDate: '09.11.2000',
    gender: 'Female',
    department: 'Information Systems',
    annualFee: '3400 EUR',
    city: 'Aydin',
    highSchoolGPA: 3.9,
    photo: 'https://randomuser.me/api/portraits/women/30.jpg',
    email: 'pelin.demir@infosystems.org'
  },
  {
    studentID: '13234567',
    status: 'active',
    nameSurname: 'Serkan Çelik',
    class: '1st year',
    birthDate: '05.06.2011',
    gender: 'Male',
    department: 'Quantum Computing',
    annualFee: '3100 EUR',
    city: 'Osmaniye',
    highSchoolGPA: 3.8,
    photo: 'https://randomuser.me/api/portraits/men/31.jpg',
    email: 'serkan.celik@quantumcomp.edu'
  },
  {
    studentID: '14345678',
    status: 'graduate',
    nameSurname: 'Nazan Kurt',
    class: 'graduate',
    birthDate: '23.01.1995',
    gender: 'Female',
    department: 'Management Inf Systems',
    annualFee: '0 EUR',
    city: 'Duzce',
    highSchoolGPA: 3.7,
    photo: 'https://randomuser.me/api/portraits/women/32.jpg',
    email: 'nazan.kurt@misystems.com'
  },
  {
    studentID: '15456789',
    status: 'pending',
    nameSurname: 'Ali Aksoy',
    class: '2nd year',
    birthDate: '27.08.2002',
    gender: 'Male',
    department: 'Bioinformatics',
    annualFee: '3300 EUR',
    city: 'Elazig',
    highSchoolGPA: 3.6,
    photo: 'https://randomuser.me/api/portraits/men/33.jpg',
    email: 'ali.aksoy@bioinfo.org'
  },
  {
    studentID: '16567890',
    status: 'active',
    nameSurname: 'Yasemin Korkmaz',
    class: '3rd year',
    birthDate: '13.05.2001',
    gender: 'Female',
    department: 'Artificial Intelligence',
    annualFee: '3500 EUR',
    city: 'Isparta',
    highSchoolGPA: 3.9,
    photo: 'https://randomuser.me/api/portraits/women/34.jpg',
    email: 'yasemin.korkmaz@ai.com'
  },
  {
    studentID: '17678901',
    status: 'graduate',
    nameSurname: 'Ferhat Aydın',
    class: 'graduate',
    birthDate: '10.11.1998',
    gender: 'Male',
    department: 'Robotics',
    annualFee: '0 EUR',
    city: 'Kars',
    highSchoolGPA: 3.7,
    photo: 'https://randomuser.me/api/portraits/men/35.jpg',
    email: 'ferhat.aydin@robotics.edu'
  },
  {
    studentID: '18789012',
    status: 'active',
    nameSurname: 'Zehra Yılmaz',
    class: '4th year',
    birthDate: '16.02.2000',
    gender: 'Female',
    department: 'Computer Engineering',
    annualFee: '3700 EUR',
    city: 'Nevsehir',
    highSchoolGPA: 4.0,
    photo: 'https://randomuser.me/api/portraits/women/36.jpg',
    email: 'zehra.yilmaz@compeng.org'
  },
  {
    studentID: '19890123',
    status: 'pending',
    nameSurname: 'Koray Kılıç',
    class: '1st year',
    birthDate: '31.07.2003',
    gender: 'Male',
    department: 'Cyber Security',
    annualFee: '3000 EUR',
    city: 'Yozgat',
    highSchoolGPA: 3.5,
    photo: 'https://randomuser.me/api/portraits/men/37.jpg',
    email: 'koray.kilic@cybersec.com'
  },
  {
    studentID: '20901234',
    status: 'active',
    nameSurname: 'Özlem Özdemir',
    class: '2nd year',
    birthDate: '26.09.2002',
    gender: 'Female',
    department: 'Data Science',
    annualFee: '3200 EUR',
    city: 'Zonguldak',
    highSchoolGPA: 3.8,
    photo: 'https://randomuser.me/api/portraits/women/38.jpg',
    email: 'ozlem.ozdemir@datasci.org'
  },
  {
    studentID: '22012345',
    status: 'graduate',
    nameSurname: 'Eren Şahin',
    class: 'graduate',
    birthDate: '21.12.1996',
    gender: 'Male',
    department: 'Network Engineering',
    annualFee: '0 EUR',
    city: 'Bartin',
    highSchoolGPA: 3.7,
    photo: 'https://randomuser.me/api/portraits/men/39.jpg',
    email: 'eren.sahin@networkeng.edu'
  },
  {
    studentID: '23123456',
    status: 'pending',
    nameSurname: 'Sevil Yıldız',
    class: '3rd year',
    birthDate: '01.01.2000',
    gender: 'Female',
    department: 'Information Technology',
    annualFee: '3400 EUR',
    city: 'Karabuk',
    highSchoolGPA: 3.9,
    photo: 'https://randomuser.me/api/portraits/women/40.jpg',
    email: 'sevil.yildiz@it.org'
  },
  {
    studentID: '24234567',
    status: 'active',
    nameSurname: 'Deniz Öz',
    class: '1st year',
    birthDate: '18.03.2011',
    gender: 'Male',
    department: 'Computer Science',
    annualFee: '3100 EUR',
    city: 'Bilecik',
    highSchoolGPA: 3.8,
    photo: 'https://randomuser.me/api/portraits/men/41.jpg',
    email: 'deniz.oz@computersci.edu'
  },
  {
    studentID: '25345678',
    status: 'graduate',
    nameSurname: 'Hülya Çetin',
    class: 'graduate',
    birthDate: '25.04.1995',
    gender: 'Female',
    department: 'Information Systems',
    annualFee: '0 EUR',
    city: 'Sinop',
    highSchoolGPA: 3.7,
    photo: 'https://randomuser.me/api/portraits/women/42.jpg',
    email: 'hulya.cetin@infosystems.org'
  },
  {
    studentID: '26456789',
    status: 'pending',
    nameSurname: 'Hüseyin Demir',
    class: '2nd year',
    birthDate: '17.08.2002',
    gender: 'Male',
    department: 'Software Engineering',
    annualFee: '3300 EUR',
    city: 'Aksaray',
    highSchoolGPA: 3.6,
    photo: 'https://randomuser.me/api/portraits/men/43.jpg',
    email: 'huseyin.demir@softeng.edu'
  },
  {
    studentID: '27567890',
    status: 'active',
    nameSurname: 'Betül Kaya',
    class: '3rd year',
    birthDate: '22.10.2001',
    gender: 'Female',
    department: 'Computer Engineering',
    annualFee: '3500 EUR',
    city: 'Kilis',
    highSchoolGPA: 3.9,
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    email: 'betul.kaya@compeng.org'
  },
  {
    studentID: '28678901',
    status: 'graduate',
    nameSurname: 'Oğuz Öz',
    class: 'graduate',
    birthDate: '13.02.1998',
    gender: 'Male',
    department: 'Management Inf Systems',
    annualFee: '0 EUR',
    city: 'Tunceli',
    highSchoolGPA: 3.7,
    photo: 'https://randomuser.me/api/portraits/men/45.jpg',
    email: 'oguz.oz@misystems.edu'
  },
  {
    studentID: '29789012',
    status: 'pending',
    nameSurname: 'Leyla Aksoy',
    class: '4th year',
    birthDate: '05.06.2000',
    gender: 'Female',
    department: 'Artificial Intelligence',
    annualFee: '3700 EUR',
    city: 'Yalova',
    highSchoolGPA: 3.9,
    photo: 'https://randomuser.me/api/portraits/women/46.jpg',
    email: 'leyla.aksoy@ai.org'
  }
]

export default data
