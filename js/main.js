
// `data-swipe-target`
// `data-swipe-direction` (left, right)
// `data-swipe-name` 
// `data-swipe-name` 
$(document).ready(function() {
    var handleItemActionTransition = (function(activeName){

        // `activeName` keeps track of the active element (thanks, closure!)
        //              initialized to "item" (see invocation below)
        //
        // 
        var directions = {
            center: 0,
            left: 100,
            right: -100,
        };

        function toPercentage(number) {
            number = number.toString();
            if (number.indexOf("%") > -1) return number;
            return number + "%";
        }

        return function handleItemActionTransition(e) {
            var $parent     = $(this).parents(".item"),
                targetName  = $(this).attr("data-swipe-target"),
                notTarget   = "[data-swipe-name]:not([data-swipe-name='"+targetName+"'])",
                direction   = $(this).attr("data-swipe-direction"),
                xTranslate  = directions[direction],
                $target     = $parent.find("[data-swipe-name='" + targetName + "']"),
                $notTargets = $parent.find(notTarget),
                targetIsActive = (targetName === activeName);

            if (targetIsActive) {
                return;
            }

            activeName = targetName; // update the "active" slide

            $notTargets.velocity({
                backgroundColorAlpha: 0,
                backgroundColor: "#fff",
                translateX: 0,
                opacity: 0,
                zIndex: -1,
            });
            // debugger;
            $target.velocity({
                backgroundColorAlpha: 1,
                backgroundColor: "#fff",
                opacity: 1,
                translateX: [toPercentage(xTranslate), 0],
                zIndex: 1,
            });

            return false; // prevent bubbling and default
        };

    })("item");

    // Assign swiping action
    $("[data-swipe-target]").click(handleItemActionTransition);

    function itemParent() {

    }
});
