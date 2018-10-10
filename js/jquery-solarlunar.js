var solarlunar_num = 0;
$(document).find("head").append('<link rel="stylesheet" href="css/lunarcalendar.css" />\n');
(function($) {
    var myDate = new Date();
    var dayue = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十', ];
    $.fn.solarlunar = function(opts) {
        solarlunar_num++;
        var obj = $(this);
        var option = $.extend({}, $.fn.solarlunar.default, opts);
        var $obj = $("."+opts.textObj);
        if( $obj.data("solar")){
            var solarArr = $obj.data("solar").split("-");
            var lunarArr = $obj.data("lunar").split("-");
            option.year = solarArr[0];
            option.month = solarArr[1];
            option.day = solarArr[2];
            option.lyear = lunarArr[0];
            option.lmonth = lunarArr[1];
            option.lday = lunarArr[2];
        }
        $obj.click(function () {
            obj.fadeIn()
            obj.css("top",$(this).height()+$(this).offset().top+10);
            go();
        })
        var lunYear = ["零","一","二","三","四","五","六","七","八","九"]
        var minyear = option.minyear < 1900 ? 1900 : option.minyear;
        var maxyear = option.maxyear > 2100 ? 2100 : option.maxyear;
        var html = '<div class="calendar-nav"><div class="calendar-item calendar' + solarlunar_num + '" data-value="1">公历</div><div class="calendar-item calendar' + solarlunar_num + '" data-value="2">农历</div></div>\n' +
            '<div class="calendar-date">' +
            '<div class="calendar-active"></div>' +
            '<div class="calendar" style="width: 100%">\n' +
            '</div>' +
            '</div>' +
            '<div class="calendar-btn-submit">确定</div>';
        obj.html(html);
        $(".calendar-btn-submit").click(function () {
            obj.fadeOut();
        });
        var solarYearSw,lunarYearSw;
        var solarMonthSw,lunarMonthSw;
        var solarDaySw,lunarDaySw;

        var html
        var year = [];
        for (var i = minyear, j = 0; i <= maxyear; i++, j++) {
            year[j] = i;
        }
        if(opts.direction=="up"){
            year.reverse();
        }

        function init(option) {
            if (option.type === 'solar') {
                html = '\t<div class="solar">' +
                    '\t\t<div class="year swiper-container" id="solarYear">\n' +
                    '\t\t<div class="swiper-wrapper">' +
                    '\t\t</div>\n' +
                    '\t\t</div>\n' +
                    '\t\t<div class="month swiper-container" id="solarMonth" >\n' +
                    '\t\t<div class="swiper-wrapper">' +
                    '\t\t\t<div class="swiper-slide" data-value="1">1月</div>\n' +
                    '\t\t\t<div class="swiper-slide" data-value="2">2月</div>\n' +
                    '\t\t\t<div class="swiper-slide" data-value="3">3月</div>\n' +
                    '\t\t\t<div class="swiper-slide" data-value="4">4月</div>\n' +
                    '\t\t\t<div class="swiper-slide" data-value="5">5月</div>\n' +
                    '\t\t\t<div class="swiper-slide" data-value="6">6月</div>\n' +
                    '\t\t\t<div class="swiper-slide" data-value="7">7月</div>\n' +
                    '\t\t\t<div class="swiper-slide" data-value="8">8月</div>\n' +
                    '\t\t\t<div class="swiper-slide" data-value="9">9月</div>\n' +
                    '\t\t\t<div class="swiper-slide" data-value="10">10月</div>\n' +
                    '\t\t\t<div class="swiper-slide" data-value="11">11月</div>\n' +
                    '\t\t\t<div class="swiper-slide" data-value="12">12月</div>\n' +
                    '\t\t</div>\n' +
                    '\t\t</div>\n' +
                    '\t\t<div class="day swiper-container" id="solarDay" >\n' +
                    '\t\t<div class="swiper-wrapper">' +
                    '\t\t</div>' +
                    '\t\t</div>\n' +
                    '\t</div>';
                obj.find(".calendar").html(html);
                initSolarYear();
                initSolarMonth();
                initSolarDay();
                $(".calendar-item").eq(0).addClass("active");
                $(".calendar-item").eq(1).removeClass("active");
            } else {
                html = '\t<div class="lunar">\n' +
                    '\t\t<div class="lyear swiper-container" id="lunarYear" >\n' +
                    '\t\t<div class="swiper-wrapper">' +
                    '\t\t</div>\n' +
                    '\t\t</div>\n' +
                    '\t\t<div class="lmonth swiper-container" id="lunarMonth" >\n' +
                    '\t\t<div class="swiper-wrapper">' +
                    '\t\t</div>\n' +
                    '\t\t</div>\n' +
                    '\t\t<div class="lday swiper-container" id="lunarDay" >\n' +
                    '\t\t<div class="swiper-wrapper">' +
                    '\t\t</div>\n' +
                    '\t\t</div>\n' +
                    '\t</div>\n';
                obj.find(".calendar").html(html);
                getNongli();
                initLunarYear();
                initLunarMonth();
                initLunarDay();
                $(".calendar-item").eq(0).removeClass("active");
                $(".calendar-item").eq(1).addClass("active");

            }
        }

        function go(){
            $(".calendar" + solarlunar_num + "").on("click", function() {
                if ($(this).data("value") == 1) {
                    option.type = "solar";
                    init(option)
                } else {
                    option.type = "lunar";
                    init(option)
                }
                setValue();
            });

            init(option);
        }

        function getNongli() {
            var nongli = solarToLunar(option.year,option.month,option.day)
            option.lyear = nongli[0];
            option.lmonth = nongli[1];
            option.lday = nongli[2];
        }

        function initSolarYear(){
            $.each(year, function(index, value) {
                obj.find(".year .swiper-wrapper").append('<div class="swiper-slide" data-value="' + value + '">' + value + '</div>');
            });
            solarYearSw = swipers("solarYear")
            solarYearSw.on("slideChange",function () {
                option.year =  obj.find(".year .swiper-slide").eq(solarYearSw.activeIndex).data("value");
                initSolarMonth();
                initSolarDay();
                setValue();
            });
        }
        function initSolarMonth(){
            myDate.setFullYear(option.year, option.month, 0);
            var lastDay = myDate.getDate();
            obj.find(".day .swiper-wrapper").html("")
            for (var i = 1; i <= lastDay; i++) {
                obj.find(".day .swiper-wrapper").append('<div class="swiper-slide" data-value="' + i + '">' + i + '日</div>');
            }
            var solarM = swipers("solarMonth")
            solarM.on("slideChange", function () {
                option.month = obj.find(".month .swiper-slide").eq(solarM.activeIndex).data("value");
                initSolarDay();
                setValue();
            });
            solarMonthSw = solarM;
        }
        function initSolarDay(){
            var solarD = swipers("solarDay")
            solarD.on("slideChange", function () {
                option.day = obj.find(".day .swiper-slide").eq(solarD.activeIndex).data("value");
                solarDaySw = solarD;
                setValue();
            });
            solarDaySw =solarD;
            setActive(obj.find(".year .swiper-slide"),option.year,solarYearSw);
            setActive(obj.find(".month .swiper-slide"),option.month,solarMonthSw);
            setActive(obj.find(".day .swiper-slide"),option.day,solarDaySw);
            setValue();
        }

        function initLunarYear(){
            $.each(year, function(index, value) {
                value = value+"";
                var lunyear = lunYear[value[0]]+lunYear[value[1]]+lunYear[value[2]]+lunYear[value[3]];
                obj.find(".lyear .swiper-wrapper").append('<div class="swiper-slide" data-value="' + value + '">' + lunyear + '</div>');
            });
            lunarYearSw = swipers("lunarYear")
            lunarYearSw.on("slideChange",function () {
                option.lyear =  obj.find(".lyear .swiper-slide").eq(lunarYearSw.activeIndex).data("value");
                initLunarMonth();
                initLunarDay();
                setValue();
            });
        }
        function initLunarMonth(){
            var lm = lunarMonth(option.lyear);
            obj.find(".lmonth .swiper-wrapper").html("");
            $.each(lm, function(index, value) {
                obj.find(".lmonth .swiper-wrapper").append('<div class="swiper-slide" data-value="' + (index+1) + '">' + value + '</div>');
            });
            var lunarM = swipers("lunarMonth")
            lunarM.on("slideChange", function () {
                option.lmonth = obj.find(".lmonth .swiper-slide").eq(lunarM.activeIndex).data("value");
                initLunarDay();
                setValue();
            });
            lunarMonthSw = lunarM;
        }
        function initLunarDay(){
            var ld = lunarLastDay(option.lyear, option.lmonth);
            obj.find(".lday .swiper-wrapper").html("");
            $.each(ld, function(index, value) {
                obj.find(".lday .swiper-wrapper").append('<div class="swiper-slide" data-value="' + (index+1) + '">' + value + '</div>');
            });
            var lunarD = swipers("lunarDay")
            lunarD.on("slideChange", function () {
                option.lday = obj.find(".lday .swiper-slide").eq(lunarD.activeIndex).data("value");
                lunarDaySw = lunarD;
                setValue();
            });
            lunarDaySw =lunarD;
            setActive(obj.find(".lyear .swiper-slide"),option.lyear,lunarYearSw);
            setActive(obj.find(".lmonth .swiper-slide"),option.lmonth,lunarMonthSw);
            setActive(obj.find(".lday .swiper-slide"),option.lday,lunarDaySw);
        }
        function swipers(obj) {
            var swiper = new Swiper('#'+obj, {
                direction : 'vertical',
                grabCursor : true,
                slidesPerView : 3,
                centeredSlides : true,
                spaceBetween : 5,
                freeMode : true,//不只滑动一格
                freeModeSticky:true,//自动贴合
                freeModeMinimumVelocity : 0.1,//惯性的最小触摸速度（px/ms）
                mousewheel: true,//支持鼠标控制
            })
            return swiper;
        }

        //设置当前状态
        function setActive(oobj,value,sw){
            oobj.each(function (index) {
                if($(this).data("value")==value){
                    $(this).siblings("div").removeAttr("swiper-slide-active");
                    $(this).addClass("swiper-slide-active");
                    sw.slideTo(index,false)
                }
            })
        }

        function setValue() {
            if (option.type === 'solar') {
                var nian = $(".year .swiper-slide").eq(solarYearSw.activeIndex).data("value") + '年';
                var yue = $(".month .swiper-slide").eq(option.month-1).text();
                var ri = $(".day .swiper-slide").eq(option.day-1).text();
                var lun = solarToLunar(option.year,option.month,option.day)
                var lunar = lun.join("-");
                var solar = option.year+"-"+option.month+"-"+option.day;
                $("."+opts.textObj).val(nian + yue + ri)
                    .text(nian + yue + ri)
                    .attr("data-solar",solar)
                    .attr("data-lunar",lunar);
            } else {
                var nian = $(".lyear .swiper-slide").eq(lunarYearSw.activeIndex).text() + '年';
                var yue = $(".lmonth .swiper-slide").eq(option.lmonth-1).text();
                var ri = $(".lday .swiper-slide").eq(option.lday-1).text();
                var sol = lunarToSolar(option.lyear,option.lmonth,option.lday)
                var solar = sol.join("-");
                var lunar = option.lyear+"-"+option.lmonth+"-"+option.lday;
                $("."+opts.textObj).val(nian + yue + ri)
                    .text(nian + yue + ri)
                    .attr("data-solar",solar)
                    .attr("data-lunar",lunar);
            }
        }

    }
    $.lunarInfo = {
        1900: [8, 1, 30, 19304],
        1901: [0, 2, 19, 19168],
        1902: [0, 2, 8, 42352],
        1903: [5, 1, 29, 21096],
        1904: [0, 2, 16, 53856],
        1905: [0, 2, 4, 55632],
        1906: [4, 1, 25, 27304],
        1907: [0, 2, 13, 22176],
        1908: [0, 2, 2, 39632],
        1909: [2, 1, 22, 19176],
        1910: [0, 2, 10, 19168],
        1911: [6, 1, 30, 42200],
        1912: [0, 2, 18, 42192],
        1913: [0, 2, 6, 53840],
        1914: [5, 1, 26, 54568],
        1915: [0, 2, 14, 46400],
        1916: [0, 2, 3, 54944],
        1917: [2, 1, 23, 38608],
        1918: [0, 2, 11, 38320],
        1919: [7, 2, 1, 18872],
        1920: [0, 2, 20, 18800],
        1921: [0, 2, 8, 42160],
        1922: [5, 1, 28, 45656],
        1923: [0, 2, 16, 27216],
        1924: [0, 2, 5, 27968],
        1925: [4, 1, 24, 44456],
        1926: [0, 2, 13, 11104],
        1927: [0, 2, 2, 38256],
        1928: [2, 1, 23, 18808],
        1929: [0, 2, 10, 18800],
        1930: [6, 1, 30, 25776],
        1931: [0, 2, 17, 54432],
        1932: [0, 2, 6, 59984],
        1933: [5, 1, 26, 27976],
        1934: [0, 2, 14, 23248],
        1935: [0, 2, 4, 11104],
        1936: [3, 1, 24, 37744],
        1937: [0, 2, 11, 37600],
        1938: [7, 1, 31, 51560],
        1939: [0, 2, 19, 51536],
        1940: [0, 2, 8, 54432],
        1941: [6, 1, 27, 55888],
        1942: [0, 2, 15, 46416],
        1943: [0, 2, 5, 22176],
        1944: [4, 1, 25, 43736],
        1945: [0, 2, 13, 9680],
        1946: [0, 2, 2, 37584],
        1947: [2, 1, 22, 51544],
        1948: [0, 2, 10, 43344],
        1949: [7, 1, 29, 46248],
        1950: [0, 2, 17, 27808],
        1951: [0, 2, 6, 46416],
        1952: [5, 1, 27, 21928],
        1953: [0, 2, 14, 19872],
        1954: [0, 2, 3, 42416],
        1955: [3, 1, 24, 21176],
        1956: [0, 2, 12, 21168],
        1957: [8, 1, 31, 43344],
        1958: [0, 2, 18, 59728],
        1959: [0, 2, 8, 27296],
        1960: [6, 1, 28, 44368],
        1961: [0, 2, 15, 43856],
        1962: [0, 2, 5, 19296],
        1963: [4, 1, 25, 42352],
        1964: [0, 2, 13, 42352],
        1965: [0, 2, 2, 21088],
        1966: [3, 1, 21, 59696],
        1967: [0, 2, 9, 55632],
        1968: [7, 1, 30, 23208],
        1969: [0, 2, 17, 22176],
        1970: [0, 2, 6, 38608],
        1971: [5, 1, 27, 19176],
        1972: [0, 2, 15, 19152],
        1973: [0, 2, 3, 42192],
        1974: [4, 1, 23, 53864],
        1975: [0, 2, 11, 53840],
        1976: [8, 1, 31, 54568],
        1977: [0, 2, 18, 46400],
        1978: [0, 2, 7, 46752],
        1979: [6, 1, 28, 38608],
        1980: [0, 2, 16, 38320],
        1981: [0, 2, 5, 18864],
        1982: [4, 1, 25, 42168],
        1983: [0, 2, 13, 42160],
        1984: [10, 2, 2, 45656],
        1985: [0, 2, 20, 27216],
        1986: [0, 2, 9, 27968],
        1987: [6, 1, 29, 44448],
        1988: [0, 2, 17, 43872],
        1989: [0, 2, 6, 38256],
        1990: [5, 1, 27, 18808],
        1991: [0, 2, 15, 18800],
        1992: [0, 2, 4, 25776],
        1993: [3, 1, 23, 27216],
        1994: [0, 2, 10, 59984],
        1995: [8, 1, 31, 27432],
        1996: [0, 2, 19, 23232],
        1997: [0, 2, 7, 43872],
        1998: [5, 1, 28, 37736],
        1999: [0, 2, 16, 37600],
        2000: [0, 2, 5, 51552],
        2001: [4, 1, 24, 54440],
        2002: [0, 2, 12, 54432],
        2003: [0, 2, 1, 55888],
        2004: [2, 1, 22, 23208],
        2005: [0, 2, 9, 22176],
        2006: [7, 1, 29, 43736],
        2007: [0, 2, 18, 9680],
        2008: [0, 2, 7, 37584],
        2009: [5, 1, 26, 51544],
        2010: [0, 2, 14, 43344],
        2011: [0, 2, 3, 46240],
        2012: [4, 1, 23, 46416],
        2013: [0, 2, 10, 44368],
        2014: [9, 1, 31, 21928],
        2015: [0, 2, 19, 19360],
        2016: [0, 2, 8, 42416],
        2017: [6, 1, 28, 21176],
        2018: [0, 2, 16, 21168],
        2019: [0, 2, 5, 43312],
        2020: [4, 1, 25, 29864],
        2021: [0, 2, 12, 27296],
        2022: [0, 2, 1, 44368],
        2023: [2, 1, 22, 19880],
        2024: [0, 2, 10, 19296],
        2025: [6, 1, 29, 42352],
        2026: [0, 2, 17, 42208],
        2027: [0, 2, 6, 53856],
        2028: [5, 1, 26, 59696],
        2029: [0, 2, 13, 54576],
        2030: [0, 2, 3, 23200],
        2031: [3, 1, 23, 27472],
        2032: [0, 2, 11, 38608],
        2033: [11, 1, 31, 19176],
        2034: [0, 2, 19, 19152],
        2035: [0, 2, 8, 42192],
        2036: [6, 1, 28, 53848],
        2037: [0, 2, 15, 53840],
        2038: [0, 2, 4, 54560],
        2039: [5, 1, 24, 55968],
        2040: [0, 2, 12, 46496],
        2041: [0, 2, 1, 22224],
        2042: [2, 1, 22, 19160],
        2043: [0, 2, 10, 18864],
        2044: [7, 1, 30, 42168],
        2045: [0, 2, 17, 42160],
        2046: [0, 2, 6, 43600],
        2047: [5, 1, 26, 46376],
        2048: [0, 2, 14, 27936],
        2049: [0, 2, 2, 44448],
        2050: [3, 1, 23, 21936],
        2051: [0, 2, 11, 37744],
        2052: [8, 2, 1, 18808],
        2053: [0, 2, 19, 18800],
        2054: [0, 2, 8, 25776],
        2055: [6, 1, 28, 27216],
        2056: [0, 2, 15, 59984],
        2057: [0, 2, 4, 27424],
        2058: [4, 1, 24, 43872],
        2059: [0, 2, 12, 43744],
        2060: [0, 2, 2, 37600],
        2061: [3, 1, 21, 51568],
        2062: [0, 2, 9, 51552],
        2063: [7, 1, 29, 54440],
        2064: [0, 2, 17, 54432],
        2065: [0, 2, 5, 55888],
        2066: [5, 1, 26, 23208],
        2067: [0, 2, 14, 22176],
        2068: [0, 2, 3, 42704],
        2069: [4, 1, 23, 21224],
        2070: [0, 2, 11, 21200],
        2071: [8, 1, 31, 43352],
        2072: [0, 2, 19, 43344],
        2073: [0, 2, 7, 46240],
        2074: [6, 1, 27, 46416],
        2075: [0, 2, 15, 44368],
        2076: [0, 2, 5, 21920],
        2077: [4, 1, 24, 42448],
        2078: [0, 2, 12, 42416],
        2079: [0, 2, 2, 21168],
        2080: [3, 1, 22, 43320],
        2081: [0, 2, 9, 26928],
        2082: [7, 1, 29, 29336],
        2083: [0, 2, 17, 27296],
        2084: [0, 2, 6, 44368],
        2085: [5, 1, 26, 19880],
        2086: [0, 2, 14, 19296],
        2087: [0, 2, 3, 42352],
        2088: [4, 1, 24, 21104],
        2089: [0, 2, 10, 53856],
        2090: [8, 1, 30, 59696],
        2091: [0, 2, 18, 54560],
        2092: [0, 2, 7, 55968],
        2093: [6, 1, 27, 27472],
        2094: [0, 2, 15, 22224],
        2095: [0, 2, 5, 19168],
        2096: [4, 1, 25, 42216],
        2097: [0, 2, 12, 42192],
        2098: [0, 2, 1, 53584],
        2099: [2, 1, 21, 55592],
        2100: [0, 2, 9, 54560]
    }

    function lunarMonth(ly) {
        var lm = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月'];
        var run = ['闰正月', '闰二月', '闰三月', '闰四月', '闰五月', '闰六月', '闰七月', '闰八月', '闰九月', '闰十月', '闰冬月', '闰腊月'];
        ly = ly < 1900 ? 1900 : (ly > 2100 ? 2100 : ly);
        var mth = $.lunarInfo[ly];
        if (mth[0] > 0) {
            lm.splice(mth[0], 0, run[mth[0] - 1]);
        }
        return lm;
    }
    function lunarIsSanshi(ly, lm) {
        ly = ly < 1900 ? 1900 : (ly > 2100 ? 2100 : ly);
        var mth = $.lunarInfo[ly];
        var tianshu = (mth[3]).toString(2);
        var shiliu = ('00000' + tianshu).slice(-16);
        return shiliu.substr(lm - 1, 1);
    }

    function lunarLastDay(ly, lm) {
        var xiaoyue = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九'];
        var is_dayue = lunarIsSanshi(ly, lm);
        if (is_dayue === '1') {
            return dayue;
        } else {
            return xiaoyue;
        }
    }

    function solarToLunar(y, m, d) {
        var mth = $.lunarInfo[y];
        var chunjie = solarDays(y, mth[1], mth[2]);
        var zhetian = solarDays(y, m, d);
        var zf = zhetian - chunjie;
        var ly = y;
        var lm = 0;
        var ld = 0;
        if (zf >= 0) {
            var tianshu = (mth[3]).toString(2);
            var shiliu = ('00000' + tianshu).slice(-16);
            var num = 0;
            var jitian = 0;
            for (var i = 0; i < shiliu.length; i++) {
                if (shiliu.substr(i, 1) === '1') {
                    num += 30;
                    jitian = 30;
                } else {
                    num += 29;
                    jitian = 29;
                }
                if (zf < num) {
                    lm = i + 1;
                    ld = zf - num + jitian + 1;
                    break;
                }
            }
        } else {
            var mthLast = $.lunarInfo[y - 1];
            var chunjie = solarDays(y - 1, mthLast[1], mthLast[2]);
            var qunian = solarDays(y - 1, 12, 31);
            var zf = zhetian + qunian - chunjie + 1;
            var tianshu = (mthLast[3]).toString(2);
            var shiliu = ('00000' + tianshu).slice(-16);
            var num = 0;
            var jitian = 0;
            for (var i = 0; i < shiliu.length; i++) {
                if (shiliu.substr(i, 1) === '1') {
                    num += 30;
                    jitian = 30;
                } else {
                    num += 29;
                    jitian = 29;
                }
                if (zf < num) {
                    ly = y - 1;
                    lm = i + 1;
                    ld = zf - num + jitian + 1;
                    break;
                }
            }
        }
        return [ly, lm, ld];
    }

    function lunarToSolar(ly, lm, ld) {
        var chunjie = lunarDays(ly, lm, ld);
        var mth = $.lunarInfo[ly];
        var yuandan = solarDays(ly, mth[1], mth[2]);
        var addNum = chunjie + yuandan;
        var ydDay = new Date(ly + '/1/1').getTime();
        var thatDay = new Date(ydDay + addNum * (24 * 60 * 60 * 1000));
        var y = thatDay.getFullYear();
        var m = thatDay.getMonth() + 1;
        var d = thatDay.getDate();
        return [y, m, d];
    }

    function solarDays(y, m, d) {
        return (new Date(y + '/' + m + '/' + d) - new Date(y + '/1/1')) / 1000 / 60 / 60 / 24;
    }

    function lunarDays(ly, lm, ld) {
        var mth = $.lunarInfo[ly];
        var tianshu = (mth[3]).toString(2);
        var shiliu = ('00000' + tianshu).slice(-16);
        var num = parseInt(ld) - 1;
        for (var i = 0; i < lm - 1; i++) {
            if (shiliu.charAt(i) === '1') {
                num += 30;
            } else {
                num += 29;
            }
        }
        return num;
    }
    $.fn.solarlunar.
        default = {
        linkage: true,
        minyear: 1900,
        maxyear: myDate.getFullYear(),
        type: "lunar",
        year: myDate.getFullYear(),
        month: myDate.getMonth()+1,
        day: myDate.getDate(),
        lyear: myDate.getFullYear(),
        lmonth: myDate.getMonth(),
        lday: 1
    };
})(jQuery);