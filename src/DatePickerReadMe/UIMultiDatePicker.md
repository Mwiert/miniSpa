UIMultiDatePicker

data:

- weekdays: Haftanın günlerini static olarak tutan dizidir. Calendar içinde günlerin adlarını göstermek için kullanılır
- calendarDate: Geçerli takvim tarihidir. İnitial olarak initialDate propunu alır
- daysInMonth: Bir ayın günlerini içeren dizidir.
- nextMonthDays: Bir sonraki ayın günlerini içeren dizidir.
- firstSelectedDate: İlk seçilen tarihtir.
- secondSelectedDate: İkinci seçilen tarihtir.
- currentDate: Geçerli tarihtir. İnitial olarak initialDate propunu alır. Üzerine işlemler yapılan date datası budur.
- nextMonthDate: initialDate'ten sonraki ayı tutar.
- prevMonthDate: initialDate'ten önceki ayı tutar.
- presentDate: Bugünün tarihini tutar, daha sonrasında değiştirilmeyecek olan date datası budur.
- minDate: Minimum tarihi tutar. Tarih validasyonlarında minimum date'i tutmak için kullanılır.
- maxDate: Maksimum tarih tutar. Tarih validasyonlarında minimum date'i tutmak için kullanılır.
- saveFirstDateHistory: İlk seçili tarihi calender'ın üstündeki seçili tarihi gösteren butonlarda kullanmayı sağlar. Böylece takvim kapatıldığında da seçili tarihleri görebiliriz.
- saveSecondDateHistory: İkinci seçili tarihi calender'ın üstündeki seçili tarihi gösteren butonlarda kullanmayı sağlar.

props:

- yearRange: Yıl aralığını belirlemek için kullanılır, UIDateRangePicker'da validateYear bu propa atanır.
- monthRange: Ay aralığını belirlemek için kullanılır, UIDateRangePicker'da validateMonth bu propa atanır.
- isPastValidation: Geçmiş tarih validasyonu olup olmadığını tutan boolean değerdir. UIDateRangePicker'da isPast bu propa atanır.
- isFutureValidation: Gelecek tarih validasyonu olup olmadığını tutan boolean değerdir. UIDateRangePicker'da isPast bu propa atanır.
- initialDate: Initial olarak kullanılacak tarihtir.UIDateRangePickerdaki fillInitialDate metodunda eğer bir initial date varsa o date, yoksa presentDate firstİnitialDate'e atanır, daha sonra da bu propa atanır.
- baseInitialDates: MultiDatePicker'da firstInitialDate ve secondInitialDate olarak iki tane initialDate bulunur, onları tutan objedir.
- isDatePickerEnable: Single date picker'ın enable olup olmadığını tutan boolean değerdir. Eğer date picker açıksa true kapalıysa false olur.

methods:

- checkRange(): Tarih validasyonlarının yapılması için kullanılır. Öncelikle isPast veya isFuture validasyonlarının olup olmadığı kontrol edilir. Daha sonrasında ise yearRange veya monthRange olup olmadığı kontrol edilir. isPast validasyonu varsa takvim sadece geçmişe doğru gidebilir demektir. O yüzden yearRange veya monthRange varsa present date'ten (dayjs().format('YYYY-MM-DD') ile present date elde edilir) bu rangeler çıkarılarak minDate elde edilir. maxDate ise present date'e eşitlenir. isFuture validasyonu varsa takvim sadece geleceğe doğru gidebilir demektir. Bu sebeple eğer yearRange veya monthRange var bu rangeler present date'e eklenerek maxDate elde edilirken min date present date'e eşitlenir. Eğer isPast veya isFuture yoksa yearRange veya monthRange'e bakılıp hangi range varsa presentDate'e eklenerek maxDate, presentDate'den çıkarılarak ise minDate elde edilir. Böylece takvimin range'in miktarına göre hem geçmişe hem geleceğe gitmesi sağlanır.

- populateMonthDays(): MultiDatePicker ardışık ayları gösteren yan yana iki takvimden oluşur, bu metot sağ ve sol tarafta gösterilecek takvimleri ayarlar. Bunu bir offset değeri alan totalDaysInMonth metodunu çağırarak yapar. Bu metotta başta isPast validasyonu olup olmadığı kontrol edilir, isPast validasyonu varsa calendarDate'in ayı ile minDate'in ayının aynı olup olmadığına bakılır. Aynı ise sol tarafta calendarDate'in takvimi, sağ tarafta bir sonraki ayın takvimi gösterilir. Bu koşul seçili günler minDate'in bulunduğu ayda olsa bile takvimin kapatılıp açıldığında minDate'den daha geriye gitmemesini sağlar. Eğer calendarDate'in ayı ile minDate'in ayı farklı ise calendarDate'in takvimi sağda, önceki ayın takvimi solda gösterilir. Eğer isPast validasyonu yoksa bu sefer calendarDate'in ayı ile maxDate'in ayının aynı olup olmadığına bakılır. Burada da aynı mantık uygulanır ve takvim kapatılıp açıldığında maxDate'in bulunduğu takvimin sağda olması ve bir sonraki ayın gösterilmemesi sağlanır. calendarDate'in ayı ile maxDate'in ayı farklı ise calendarDate'in takvimi solda, sonraki ayın takvimi sağda gösterilir.

- totalDaysInMonth(offset: number): Aya göre takvimin oluşturulduğu metottur. Bir offset parametresi alır. Bu parametre günleri bulunacak ayın hesaplanmasını sağlar. daysInWholeMonth array'i daha sonra ayın günlerini içermek için boş bir şekilde oluşturulur. dayjs kütüpjhanesinin startOf ve endOf metotları offset parametresi ay sayısı olarak eklenerek oluşturulacak ayın ilk ve son günlerinin numaralarını döndürmesi için kullanılır ve startOfMonth ve endOfMonth'a eşitlenir. dayjs kütüphanesinin startOfMonth.day() metodu ayın ilk günü için haftanın gününü (0-6) verir. Burada pazar günü 0'a denk geldiği için günleri kaydırmamız gerekir. 6 eklemek, günleri Pazar (0) haftanın son günü olacak şekilde kaydırken mod 7, değerin 0-6 aralığında kalmasını sağlar. Bu mantığa dayanarak daha sonraki for looplarında kullanmak üzere ilk günü tutan offsetValue ve son günü tutan endOffsetValue constantları oluşturulur. Bu metotta oluşturdukları günleri daysInWholeMonth array'ine pushlayan üç tane for döngüsü kullanılır. İlk for döngüsü ayın başındaki boş değerlerin oluşturulmasını sağlar, burada günler UIDatePicker interface'indeki inactive özelliği kullanılarak inactive olarak ayarlanır. İkinci for döngüsü ayın günlerini oluşturmayı sağlar. Döngü içerisinde her gün UIDatePicker interface'ine göre oluşturulur. Son for döngüsü ise takvimin sonundaki inactive günleri oluşturmak için kullanılır. En sonunda daysInMonth datası burada oluşturulan array'e eşitlenir.

- onClickRight(): Takvimi bir sonraki aya ilerletmek için kullanılır. Öncelikle nextMonthDate ve prevMonthDate ayarlanır. Bu metotta calendarDate'e bir ay ekleneceği için nextMonthDate'e iki eklenir, prevMonthDate calenderDate olur. Daha sonra calendarDate'e dayjs kütüphanesinin add metodunu kullanarak bir ay eklenir daha sonra da uygun formatı kullanılarak bu calendarDate currentDate'e eşitlenir. En sonunda ise takvimin içini doldurması için populdateMonthDays() ve diğer metotlar çağırılır.

- onClickLeft(): Takvimi bir önceki aya almak için kullanılır. Öncelikle nextMonthDate ve prevMonthDate ayarlanır. Bu metotta calendarDate'ten bir ay çıkarılacağı için prevMonthDate'ten iki çıkarılır, nextMonthDate calenderDate olur. Daha sonra calendarDate'e dayjs kütüphanesinin subtract metodunu kullanarak bir ay çıkarılır daha sonra da uygun formatı kullanılarak bu calendarDate currentDate'e eşitlenir. En sonunda ise takvimin içini doldurması için populdateMonthDays() ve diğer metotlar çağırılır.

- selectDate(): Gün seçimini sağlayan metottur. Parametre olarak seçilmek istenen günü alır.
  Öncelikle initialDate varsa emitResetInitialDate metodu ile onları resetler.
  Daha sonra eğer firstSelectedDate seçili değilse metot parametresindeki selectedDay'i firstSelectedDate'e eşitler, o günün selected özelliğini true yapar ve saveFirstDateHistory'e o günü kaydeder.
  Eğer selectedDay firstSelectedDate'ten daha küçükse ve secondSelectedDate yoksa secondSelectedDate'i firstSelectedDate'e eşitler ve selectedDay'i firstSelectedDate yapar. Selected özelliklerini her ikisi için true yapar ve date history'leri günceller.
  Eğer selectedDay firstSelectedDate'ten daha küçükse ve secondSelectedDate varsa selectedDay'i first selectedDate yaparken secondSelectedDate değiştirilmez.
  Eğer selectedDay firstSelectedDate'e eşitse ve isPast validasyonu varsa firstSelectedDate secondSelectedDate yapılır ve secondSelectedDate boşa çevrilir. Burada bunu yapma amacımız isPast validasyonunda geçmişe dönük bir seçim olacağı için firstSelectedDate'in daha ileri bir tarih yapılabilmesini sağlamaktır.
  Eğer selectedDay firstSelectedDate'e eşitse ve isPast validasyonu yoksa hem firstSelectedDate hem de secondSelectedDate seçimleri kaldırılır.
  Eğer selectedDay firstSelectedDate'ten büyükse secondSelectedDate değiştirilerek selectedDay'e eşitlenir.
  En sonunda emitDate metoduyla firstSelectedDate ve secondSelectedDate tarihleri emitlenir. İki tarih arasındaki günleri ayarlamak içinse deactivateAllBetween() metodundan sonra updateBetweenDates() çağırılır.

- emitResetInitialDates(): İki tane forEach döngüsü içerir. Biri daysInMonth dizisi içinde diğeri nextMonthDays dizisi içinde gezerek firstInitialDate ve secondInitialDate özellikleri true olan günlerin bu özelliklerini false yapar ve sonra emitler.

- emitResetSecondDates(): emitResetInitialDates() metodunun yaptıklarını sadece secondInitialDate için yapar.

- checkDateHistory(): Date history'leri kontrol edip, selected date'leri ayarlamayı sağlar. İki for döngüsü içerir. İlk for döngüsü daysInMonth dizisinin tüm günlerini gezerek saveFirstDateHistory'deki güne selected özelliği ekler ve o günü firstSelectedDate'e eşitler, saveSecondDateHistory'deki güne selected özelliği ekler ve o günü secondSelectedDate'e eşitler. Diğer for döngüsü ise aynı işlemleri nextMonthDays için yapar.

- deactivateAllBetween(): Selected günler değiştiğinde önceki selected günlere göre yapılan between ayarını kaldırır. Bunu daysInMonth ve nextMonthDays dizilerini iki ayrı forEach döngüsü içinde gezip günlerin between ve active özelliklerini false yaparak sağlar.

- updateBetweenDates(): Bu metot iki tarih arasındaki (firstSelectedDate ve secondSelectedDate) günlerin arka planının renklendirmek için kullanılır. Metot 2 tarih de seçiliyse çalışır. Eğer 2 tarih de seçili ise bu tarihlerin farklı aylarda veya aynı ayda oluşuna göre if else bloklarına girer. 
if bloğu seçilen tarihler farklı aylardaysa çalışır. Burada iki for döngüsü bulunur. İlk for döngüsünde: ilk seçilen tarih soldaki takvimde ise takvimdeki ilk seçilen tarihin sağ tarafını renklendirir, ikinci seçilen tarih sol takvimde ise takvimdeki ikinci seçilen tarihin sol tarafını renklendirir veya iki seçilen de soldaki takvimde değil ise takvimin tamamını renklendirir. İkinci for döngüsünde:  ilk seçilen tarih sağdaki takvimde ise takvimdeki ilk seçilen tarihin sağ tarafını renklendirir, ikinci seçilen tarih sağ takvimde ise takvimdeki ikinci seçilen tarihin sol tarafını renklendirir veya iki seçilen de sağdaki takvimde değil ise takvimin tamamını renklendirir.
else bloğu iki tarih de aynı aylardaysa çalışır. Yine içinde 2 for döngüsü bulunur. İlk for döngüsünde seçilen tarihler soldaki takvimde ise 2 tarih arasındaki günleri renklendirir. İkinci for döngüsünde seçilen tarihler sağdaki takvimde ise 2 tarih arasındaki günleri renklendirir. 



- linedThroughDate(): UIDatePicker interface'indeki textDecoration özelliğini ayarlamak için kullanılır. Öncelikle isPast ve diğer validasyonlar için olmak üzere if else koşulu oluşturulur. isPast validasyonu varsa presentDate sağdaki takvimde gösteriliyor demektir. Bu yüzden nextMontDays dizisinin gezen bir for döngüsü içinde present date'ten sonraki ve varsa range'den önceki günlerin textDecoration özelliği true yapılır. Daha sonra daysInMonth için de aynısını yapar. Bu özelliği true olan günlerin üzeri çizilidir ve şeçilemezler. Diğer validasyonlarda da nextMontDays ve daysInMonth dizilerinin günlerini gezen iki ayrı for döngüsü içinde present date'ten önceki ve varsa range'den sonraki günlerin textDecoration özelliği true yapılır.

watch:

- isDatePickerEnable(): datePicker kapatılıp açıldığında seçili günün olduğu aydan açılmasını sağlar. Eğer saveFirstDateHistory yoksa takvimi presentDate'in ayından açarken saveFirstDateHistory varsa takvimi saveFirstDateHistory'nin ayından açar.

- saveFirstDateHistory(): saveFirstDateHistory'i izler. Eğer saveFirstDateHistory boş ise initialDate'ler işaretlenir.

created: Takvimin doğru oluşturulması için gereken metotlar doğru sırayla çağırılır.
