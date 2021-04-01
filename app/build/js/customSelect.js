$(document).ready(function () {

    $('.custom-select-head').on('click', function () {
        $(this).closest('.custom-select-wrapper').toggleClass('focus');
    });

    $('.custom-select-list li').on('click', function () {
        $(this).closest('.custom-select-list').find('li').removeClass('selected');
        $(this).addClass('selected');
        $(this).closest('.custom-select-wrapper').removeClass('focus');
        let value = $(this).attr('data-value');
        $(this).closest('.custom-select-wrapper').find('.custom-select-head span').text(value);
        $(this).closest('.custom-select-wrapper').find('select option:selected').attr('selected', null);
        $(this).closest('.custom-select-wrapper').find('select option[value="' + value + '"]').attr("selected", "selected");
    });

    $(document).mouseup(function (e){
        let div = $(".custom-select-wrapper");
        if (!div.is(e.target)
            && div.has(e.target).length === 0) {
            $('.custom-select-wrapper').removeClass('focus');
        }
    });
});
