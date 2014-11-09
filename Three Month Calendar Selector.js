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
	var rightNow = new Date(); //current date global
	var d = new Date();
	var calYear = d.getFullYear();
	var calMonth = d.getMonth();
	var calDate = d.getDate();
	var dateSlot = null;

YUI().use('calendar', 'datatype-date', function (Y) {
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

		/*
        // Get a reference to Y.DataType.Date
        var dtdate = Y.DataType.Date;

        prevMonth.on("blur", function () {
            prevMonth.deselectDates();
        });

        thisMonth.on("blur", function () {
            thisMonth.deselectDates();
        });

        nextMonth.on("blur", function () {
            nextMonth.deselectDates();
        });
		*/

        // Listen to calendar's selectionChange event to pass selection to field
		// Ordering is important, because deselectDates() is a selectionChange
        prevMonth.on("selectionChange", function (ev) {
			var newDate = ev.newSelection[0];
			dateSlot = $("QR~"+dateEnter);
            
            Y.one("#dateSlot").setHTML(dtdate.format(newDate));
        });

        thisMonth.on("selectionChange", function (ev) {
			dateSlot = $("QR~"+dateEnter);
            var newDate = ev.newSelection[0];
            Y.one("#dateSlot").setHTML(dtdate.format(newDate));
        });

        nextMonth.on("selectionChange", function (ev) {
			dateSlot = $("QR~"+dateEnter);
            var newDate = ev.newSelection[0];
            Y.one("#dateSlot").setHTML(dtdate.format(newDate));
        });

    });
	
});