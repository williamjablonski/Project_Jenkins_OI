(function() {
    job = {
       parametros: [{  }]
      }
      console.log(job)
})()

function selectItem(){
    var conceptName = $('#tipo[]').find(":selected").val();
    console.log(conceptName)
    if(conceptName == "Escolha"){
        $('#exampleModalCenter').modal('show');
    }
}

function checkYes() {
const opt = document.querySelector('#options');
const param = document.querySelector('#param');
opt.classList.add('animate__animated', 'animate__zoomOutDown');
opt.addEventListener('animationend', () => {
$('#opt').css('display', 'none')
$('#param').css('display', '')
param.classList.add('animate__animated', 'animate__rotateInDownLeft');

});

}

// Add button Delete in row
$('tbody tr')
    .find('td')
    //.append('<input type="button" value="Delete" class="del"/>')
    .parent() //traversing to 'tr' Element
    .append('<td style="text-align: center" ><a href="#" class="btn btn-danger" aria-pressed="true"><i class="material-icons">clear</i></a></td>');

// For select all checkbox in table
$('#checkedAll').click(function (e) {
	//e.preventDefault();
    $(this).closest('#tblAddRow').find('td input:checkbox').prop('checked', this.checked);
});

// Add row the table
$('#btnAddRow').on('click', function() {
    var lastRow = $('#tblAddRow tbody tr:last').html();
    //alert(lastRow);
    $('#tblAddRow tbody').append('<tr>' + lastRow + '</tr>');
    $('#tblAddRow tbody tr:last input').val('');
});

// Delete last row in the table
$('#btnDelLastRow').on('click', function() {
    var lenRow = $('#tblAddRow tbody tr').length;
    //alert(lenRow);
    if (lenRow == 1 || lenRow <= 1) {
        alert("Não é possível remover todas as linhas!");
    } else {
        $('#tblAddRow tbody tr:last').remove();
    }
});

// Delete row on click in the table
$('#tblAddRow').on('click', 'tr a', function(e) {
    var lenRow = $('#tblAddRow tbody tr').length;
    e.preventDefault();
    if (lenRow == 1 || lenRow <= 1) {
        alert("Não é possível remover todas as linhas!");
    } else {
        $(this).parents('tr').remove();
    }
});

// Delete selected checkbox in the table
$('#btnDelCheckRow').click(function() {
	var lenRow		= $('#tblAddRow tbody tr').length;
    var lenChecked	= $("#tblAddRow input[type='checkbox']:checked").length;
    var row	= $("#tblAddRow tbody input[type='checkbox']:checked").parent().parent();
    //alert(lenRow + ' - ' + lenChecked);
    if (lenRow == 1 || lenRow <= 1 || lenChecked >= lenRow) {
        alert("Não é possível remover todas as linhas!");
    } else {
        row.remove();
    }
});