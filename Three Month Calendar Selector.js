//--------------------------
// Three Month Calendar v1.1
// To be used in conjunction with Qualtrics Survey Software and other code
// If you don't know me, but are using this code, please get in touch! I'd love to hear from you.
// Also contact with bugs, feature suggestions or to tell me about how to improve.
// Zach Burns, 2014
// z-burns {at} kellogg {dot} northwestern {dot} edu
//--------------------------

//HTML
<script src="http://yui.yahooapis.com/3.18.1/build/yui/yui-min.js"></script>

<div id="demo" class="yui3-skin-sam yui3-g">

    <div id="leftcolumn" class="yui3-u-1-3">
        <div id="prevMonth"></div>
    </div>
	
    <div id="centercolumn" class="yui3-u-1-3">
        <div id="thisMonth"></div>
    </div>
	
    <div id="rightcolumn" class="yui3-u-1-3">
        <div id="nextMonth"></div>
    </div>
	
</div>

//CSS
<style>
.yui3-calendarnav-prevmonth {
    display: none !important;
}
.yui3-calendarnav-nextmonth {
    display: none !important;
}
.yui3-skin-sam .redtext {
    color:#ff0000;
}
</style>

//JavaScript
Qualtrics.SurveyEngine.addOnload(function()
{	
	var dateSlot = $("QR~"+this.questionId);
	var rightNow = new Date(); //current date global
	var d = new Date();
	var calYear = d.getFullYear();
	var calMonth = d.getMonth();
	var calDate = d.getDate();
    var changeTo = null;
    var changeState = 1;

YUI().use('calendar', 'datatype-date', 'node', function (Y) {
    // Creates 3 new calendar instances
    var prevMonth = new Y.Calendar({
        contentBox: "#prevMonth",
        showPrevMonth: false,
        showNextMonth: false,
        date: new Date(calYear, calMonth - 1, 1)
    }).render();

    var thisMonth = new Y.Calendar({
        contentBox: "#thisMonth",
        showPrevMonth: false,
        showNextMonth: false,
        date: new Date(calYear, calMonth, 1)
     }).render();

     var nextMonth = new Y.Calendar({
            contentBox: "#nextMonth",
            showPrevMonth: false,
            showNextMonth: false,
            date: new Date(calYear, calMonth + 1, 1)
     }).render();

        //Sets rules for custom renderer to show today
        var rules = {};
        rules[calYear] = {};
        rules[calYear][calMonth] = {};
        rules[calYear][calMonth][calDate] = "today";

        //custom renderer to highlight current date
        thisMonth.set("customRenderer", {
            rules: rules,
            filterFunction: function (date, node, rules) {
                if (rules.indexOf('today' >= 0)) {
                    node.addClass("redtext");
                }
            }
        });

        // Get a reference to Y.DataType.Date
        var dtdate = Y.DataType.Date;
    	
        prevMonth.on("selectionChange",  function upDate(ev){
              if (changeState == 1){
                var changeTo = dtdate.format(ev.newSelection[0], {format: "%b %d, %Y"});
                dateSlot.value = changeTo;
                changeState = changeState + 1;
                thisMonth.deselectDates();
                nextMonth.deselectDates();
            } else {
                changeState = changeState + 1;
            }
            if (changeState == 4){
                changeState = 1;
            }
        } );

        thisMonth.on("selectionChange",  function upDate(ev){
            if (changeState == 1){
                var changeTo = dtdate.format(ev.newSelection[0], {format: "%b %d, %Y"});
                dateSlot.value = changeTo;
                changeState = changeState + 1;
                prevMonth.deselectDates();
                nextMonth.deselectDates();
            } else {
                changeState = changeState + 1;
            }
            if (changeState == 4){
                changeState = 1;
            }
        } );
    
        nextMonth.on("selectionChange",  function upDate(ev){
              if (changeState == 1){
                var changeTo = dtdate.format(ev.newSelection[0], {format: "%b %d, %Y"});
                dateSlot.value = changeTo;
                changeState = changeState + 1;
                prevMonth.deselectDates();
                thisMonth.deselectDates();
            } else {
                changeState = changeState + 1;
            }
            if (changeState == 4){
                changeState = 1;
            }
        } );

    });
	
});