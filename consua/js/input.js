$(document).ready(function() {

	var myName = $('.name');
	
	myName.focus(function() {
		if ($(this).val() == $(this).prop('defaultValue')) {
		$(this).val('');
		}
	});

	myName.blur(function() {
		if ($(this).val() == '') {
		$(this).val($(this).prop('defaultValue'));
		}
	});
	
	
	var myEmail = $('.email');
	
	myEmail.focus(function() {
		if ($(this).val() == $(this).prop('defaultValue')) {
		$(this).val('');
		}
	});

	myEmail.blur(function() {
		if ($(this).val() == '') {
		$(this).val($(this).prop('defaultValue'));
		}
	});
	
	
	var myPhone = $('.phone');
	
	myPhone.focus(function() {
		if ($(this).val() == $(this).prop('defaultValue')) {
		$(this).val('');
		}
	});

	myPhone.blur(function() {
		if ($(this).val() == '') {
		$(this).val($(this).prop('defaultValue'));
		}
	});
	
});