const selectOrder = document.getElementById("productOrder");
const formOrder = document.getElementById("formOrder");

selectOrder.addEventListener('change', function () {
    formOrder.submit();
});