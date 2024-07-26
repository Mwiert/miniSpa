UIDatePicker

data:

- weekdays: Haftanın günlerini static olarak tutan dizidir. Calendar içinde günlerin adlarını göstermek için kullanılır
- calendarDate: Geçerli takvim tarihidir. İnitial olarak saveDate propunu alır
- daysInMonth: Bir ayın günlerini içeren dizidir.
- firstSelectedDate: İlk seçilen tarihtir.
- currentDate: Geçerli tarihtir. İnitial olarak saveDate propunu alır. Üzerine işlemler yapılan date datası budur.
- presentDate: Bugünün tarihini tutar, daha sonrasında değiştirilmeyecek olan date datası budur.
- minDate: Minimum tarihi tutar. Tarih validasyonlarında minimum date'i tutmak için kullanılır.
- maxDate: Maksimum tarih tutar. Tarih validasyonlarında minimum date'i tutmak için kullanılır.
- saveDateHistory: Seçili tarihi calender'ın üstündeki seçili tarihi gösteren butonlarda kullanmayı sağlar.

props:

- yearRange: Yıl aralığını belirlemek için kullanılır, UIDateRangePicker'da validateYear bu propa atanır.
- monthRange: Ay aralığını belirlemek için kullanılır, UIDateRangePicker'da validateMonth bu propa atanır.
- saveDate: Initial olarak kullanılacak tarihtir.UIDateRangePickerdaki fillInitialDate metodunda eğer bir initial date varsa o date, yoksa presentDate firstİnitialDate'e atanır, daha sonra da bu propa atanır.
- isPastValidation: Geçmiş tarih validasyonu olup olmadığını tutan boolean değerdir. UIDateRangePicker'da isPast bu propa atanır.
- isFutureValidation: Gelecek tarih validasyonu olup olmadığını tutan boolean değerdir. UIDateRangePicker'da isFuture bu propa atanır.
- isDatePickerEnable: Single date picker'ın enable olup olmadığını tutan boolean değerdir. Eğer date picker açıksa true kapalıysa false olur.

methods:

- checkRange(): Tarih validasyonlarının yapılması için kullanılır. Öncelikle isPast veya isFuture validasyonlarının olup olmadığı kontrol edilir. Daha sonrasında ise yearRange veya monthRange olup olmadığı kontrol edilir. isPast validasyonu varsa takvim sadece geçmişe doğru gidebilir demektir. O yüzden yearRange veya monthRange varsa present date'ten (dayjs().format('YYYY-MM-DD') ile present date elde edilir) bu rangeler çıkarılarak minDate elde edilir. maxDate ise present date'e eşitlenir. isFuture validasyonu varsa takvim sadece geleceğe doğru gidebilir demektir. Bu sebeple eğer yearRange veya monthRange var bu rangeler present date'e eklenerek maxDate elde edilirken min date present date'e eşitlenir. Eğer isPast veya isFuture yoksa yearRange veya monthRange'e bakılıp hangi range varsa presentDate'e eklenerek maxDate, presentDate'den çıkarılarak ise minDate elde edilir. Böylece takvimin range'in miktarına göre hem geçmişe hem geleceğe gitmesi sağlanır.

- totalDaysInMonth(): Aya göre takvimin oluşturulduğu metottur. daysInWholeMonth array'i daha sonra ayın günlerini içermek için boş bir şekilde oluşturulur. dayjs kütüpjhanesinin startOf ve endOf metotları ayın ilk ve son günlerinin numaralarını döndürmesi için kullanılır ve bunlar startOfMonth ve endOfMonth'a eşitlenir. dayjs kütüphanesinin startOfMonth.day() metodu ayın ilk günü için haftanın gününü (0-6) verir. Burada pazar günü 0'a denk geldiği için günleri kaydırmamız gerekir. 6 eklemek, günleri Pazar (0) haftanın son günü olacak şekilde kaydırken mod 7, değerin 0-6 aralığında kalmasını sağlar. Bu mantığa dayanarak daha sonraki for loplarında kullanmak üzere ilk günü tutan offsetValue ve son günü tutan endOffsetValue constantları oluşturulur. Bu metotta oluşturdukları günleri daysInWholeMonth array'ine pushlayan üç tane for döngüsü kullanılır. İlk for döngüsü ayın başındaki boş değerlerin oluşturulmasını sağlar, burada günler UIDatePicker interface'i ile inactive olarak ayarlanır. İkinci for döngüsü ayın günlerini oluşturmayı sağlar. Döngü içerisinde her gün UIDatePicker interface'ine göre oluşturulur. Son for döngüsü ise takvimin sonundaki inactive günleri oluşturmak için kullanılır. En sonunda daysInMonth datası burada oluşturulan array'e eşitlenir.

- onClickRight(): Takvimi bir sonraki aya ilerletmek için kullanılır. calendarDate'e dayjs kütüphanesinin add metodunu kullanarak bir ay eklenir daha sonra da uygun formatı kullanılarak bu calendarDate urrentDate'e eşitlenir. En sonunda ise takvimin içini doldurması için totalDaysInMonth() metodu çağırılır.

- onClickLeft(): Takvimi bir önceki aya almak için kullanılır. calendarDate'e dayjs kütüphanesinin subtract metodunu kullanarak bir ay çıkarılır daha sonra da uygun formatı kullanılarak bu calendarDate urrentDate'e eşitlenir. En sonunda ise takvimin içini doldurması için totalDaysInMonth() metodu çağırılır.

- currentMonth(): Geçerli ayın adını döndürür.

- currentYear(): Geçerli yılı döndürür.

- selectDate(): Gün seçimini sağlayan metottur. Parametre olarak seçilmek istenen günü alır. Öncelikle firstSelected date'in selected özelliğini false yapıp firstSelectedDate parametredeki güne eşitler ve firstSelected date'in selected özelliğini tekrardan true yaparak yeni gün seçimini sağlar. Daha sonra bu yeni seçili günün date'ini saveDateHistory'e eşitler. En sonunda ise seçili günü parent component olan UIDateRangePicker!a emitler.

- checkDateHistory(): Bir for döngüsüyle günün tüm aylarını gezerek saveDateHistory'deki güne selected özelliği ekler ve o günü firstSelectedDate'e eşitler.

- linedThroughDate(): UIDatePicker interface'indeki textDecoration özelliğini ayarlamak için kullanılır. Öncelikle isPast ve diğer validasyonlar için olmak üzere if else koşulu oluşturulur. isPast validasyonunda present date'ten sonraki ve varsa range'den önceki günlerin textDecoration özelliği true yapılır. Bu özelliği true olan günlerin üzeri çizilidir ve şeçilemezler. diğer validasyonlarda ise present date'ten önceki ve varsa range'den sonraki günlerin textDecoration özelliği true yapılır.

computed:

- dateHolder(): Takvimin günlerinin üstünde gösterilen ay ve yılı hesaplar. Template'te kullanılır.

watch:

- isDatePickerEnable(): datePicker kapatılıp açıldığında seçili günün olduğu aydan açılmasını sağlar.

created: Takvimin doğru oluşturulması için gereken metotların doğru sırayla çağırılır.
