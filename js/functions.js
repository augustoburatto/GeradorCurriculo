var key = 'fe8baaae5bef4d9b1a1d60d5c74e2403'; //gets the key from the user
var countComp = 0;
var countFormacao = 0;
var countExper = 0;

function clearStorage()
{
    var quinzeSegundos = 15000; // 15 segundos em milissegundos
    var agora = new Date();
    var hoje = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
    var msDesdeMeiaNoite = agora.getTime() - hoje.getTime();
    if (msDesdeMeiaNoite < quinzeSegundos) {
        //clears the entire localStorage
        localStorage.clear()
    }
}

function store()
{ //stores items in the localStorage
    var nome = document.getElementById('nome').value;
    var telefone = document.getElementById('telefone').value;
    var nasc = document.getElementById('nasc').value;
    var email = document.getElementById('email').value;
    var address = document.getElementById('address').value;
    var sobre = document.getElementById('sobre').value;

    const data = {
        nome: nome,
        telefone: telefone,
        nasc: nasc,
        email: email,
        address: address,
        sobre: sobre,
    }

    window.localStorage.setItem(key,JSON.stringify(data));  
    //converting object to string
}

function retrieveRecords()
{
    //retrieves items in the localStorage
    var records = window.localStorage.getItem(key);
    arr = $.parseJSON(records); //convert to javascript array
    $.each(arr,function(key, val)
    {
        $('#'+key).val(val);
    });
}

function maskIt(w, e, m, r, a)
{
    // Cancela se o evento for Backspace
    if (!e) var e = window.event
    if (e.keyCode) code = e.keyCode;
    else if (e.which) code = e.which;

    // Variaveis da funcao
    var txt = (!r) ? w.value.replace(/[^\d]+/gi, '') : w.value.replace(/[^\d]+/gi, '').reverse();
    var mask = (!r) ? m : m.reverse();
    var pre = (a) ? a.pre : "";
    var pos = (a) ? a.pos : "";
    var ret = "";

    if (code == 9 || code == 8 || txt.length == mask.replace(/[^#]+/g, '').length) return false;

    // Loop na mascara para aplicar os caracteres
    for (var x = 0, y = 0, z = mask.length; x < z && y < txt.length;) {
        if (mask.charAt(x) != '#') {
            ret += mask.charAt(x); x++;
        } else {
            ret += txt.charAt(y); y++; x++;
        }
    }

    // Retorno da funcao
    ret = (!r) ? ret : ret.reverse();
    w.value = pre + ret + pos;
}

$(document).ready(function () {
    $('#nasc').keyup(function (e) {
        maskIt(this, e, "##/##/####");
    });
    $('#telefone').keyup(function (e) {
        maskIt(this, e, "(##)#########");
    });

    setInterval(() => {
        store();
    }, 3000);

    retrieveRecords();

    setInterval(() => {
        clearStorage();
    }, 10000);
});

function addKeyup()
{
    var maskDate = "##/####";
    $('input[id^="inicio"]').keyup(function (e) {
        maskIt(this, e, maskDate);
    });
    $('input[id^="final"]').keyup(function (e) {
        maskIt(this, e, maskDate);
    });
}

function addExperiencias()
{
    // var experiencias = document.getElementById('experiencias');
    $('#experiencias').append('<div class="col-sm-12 form-group"><div class="col-sm-3 form-group"><label>Empresa</label><input id="empresa' + countExper + '" class="form-control" /></div><div class="col-sm-3 form-group"><label>Cargo</label><input id="cargo' + countExper + '" class="form-control" /></div><div class="col-sm-2 form-group"><label>Data de Início</label><input placeholder="03/2021" id="inicio_exp' + countExper + '" class="form-control" /></div><div class="col-sm-2 form-group"><label>Data de Término</label><input placeholder="03/2021" id="final_exp' + countExper + '" class="form-control" /></div><div class="col-sm-3 form-group"><button id="experiencia' + countExper + '_rmv" class="btn btn-danger" onClick="removeCat(this, \'experiencias\')">Remover</button></div></div>');
    addKeyup();
    countExper++;
}

function addFormacao()
{
    // var formacao = document.getElementById('formacoes');
    // formacao.innerHTML +=
    $('#formacoes').append('<div class="col-sm-12 form-group"><div class="col-sm-2 form-group"><label>Grau</label><input placeholder="Graduação" id="grau' + countFormacao + '" class="form-control" /></div><div class="col-sm-3 form-group"><label>Instituição</label><input id="instituicao' + countFormacao + '" class="form-control" /></div><div class="col-sm-3 form-group"><label>Curso</label><input id="curso' + countFormacao + '" class="form-control" /></div><div class="col-sm-2 form-group"><label>Data de Início</label><input placeholder="03/2021" id="inicio_edu' + countFormacao + '" class="form-control" /></div><div class="col-sm-2 form-group"><label>Data de Término</label><input placeholder="03/2021" id="final_edu' + countFormacao + '" class="form-control" /></div><div class="col-sm-3 form-group"><button id="formacao' + countFormacao + '_rmv" class="btn btn-danger" onClick="removeCat(this, \'formacao\')">Remover</button></div></div>');
    addKeyup();
    countFormacao++;
}

function addCompetencia()
{
    options = '<option value=""></option><option value="Básico">Básico</option><option value="Intermediário">Intermediário</option><option value="Avançado">Avançado</option>';

    // var competencias = document.getElementById('competencias');
    $('#competencias').append('<div class="col-sm-12 form-group"><div class="col-sm-5 form-group"><label>Descrição</label><input placeholder="Microsoft Excel" id="comp' + countComp + '" class="form-control" /></div><div class="col-sm-5 form-group"><label>Nível</label><select id="nivel' + countComp + '" class="form-control">' + options + '</select></div><div class="col-sm-3 form-group"><button id="comp' + countComp + '_rmv" class="btn btn-danger" onClick="removeCat(this, \'competencias\')">Remover</button></div></div>');
    countComp++;
}

function removeCat(campo, form_id)
{
    // document.getElementById(campo.id).parentElement.style.display = 'none';
    $('#' + campo.id).parent().parent().remove();
    if (form_id == "competencias") {
        countComp--;
    } else if (form_id == "formacao") {
        countFormacao--;
    } else {
        countExper--;
    }
}

function formatDate(date)
{
    date = moment(date, "YYYY/MM/DD");
    date = date.format("DD/MM/YYYY");
    return date;
}

function validateForm()
{
    var msg = '';
    var validate = true;
    var email = document.getElementById('email').value;
    var re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
        validate = false;
        msg = "Formato de E-mail inválido!";
    }

    const dataNasc = document.getElementById('nasc').value;
    if (!isDateValid(dataNasc)) {
        validate = false;
        msg = "Formato da Data de Nascimento inválido!";
    }

    if (validate) {
        createPdf();
    } else {
        alert(msg);
        return validate;
    }
}

function isDateValid(dateString) {
    const date = new Date(dateString);
    const dateNow = new Date();
    const dateLimite = dateNow.getFullYear() - 16

    return (
      !isNaN(date.getTime()) && 
      date.toISOString().slice(0, 10) === dateString &&
      date.getDate() + 1 === parseInt(dateString.split('-')[2], 10) &&
      date.getMonth() + 1 === parseInt(dateString.split('-')[1], 10) &&
      date.getFullYear() === parseInt(dateString.split('-')[0], 10) &&
      date.getFullYear() > 1950 &&
      date.getFullYear() <= dateLimite
    );
}

function createPdf()
{
    var doc = new jsPDF('p', 'pt', 'letter');
    var specialElementHandlers = {
        '#editor': function (element, renderer) {
            return true;
        }
    };
    var address = document.getElementById('address').value;
    var nome = document.getElementById('nome').value;
    var tel = document.getElementById('telefone').value;
    var email = document.getElementById('email').value;
    var sobre = document.getElementById('sobre').value;
    var nasc = document.getElementById('nasc').value;

    var html = '<h1>' + nome + '</h1><p><strong>Endereço: </strong>' + address + '</p><p><strong>Telenfoe: </strong>' + tel + '</p><p><strong>E-mail: </strong>' + email + '</p><p><strong>Data de Nascimento: </strong>' + nasc + '</p><p><strong>_________________________________________________________________________________</strong></p><h3>Sobre</h3><p>' + sobre + '</p>';

    html += '<p><strong>_________________________________________________________________________________</strong></p>';
    html += '<h3>Histórico Profissional</h3>';
    for (e = 0; e < countExper; e++) {
        var inicio_exp = document.getElementById('inicio_exp' + e).value;
        var final_exp = document.getElementById('final_exp' + e).value;
        if (document.getElementById('empresa' + e).value != '') {
            var periodo_exp = '(' + inicio_exp;
            if (final_exp == '') {
                periodo_exp += ' - momento';
            } else {
                periodo_exp += ' - ' + final_exp;
            }
            periodo_exp += ")";
            html += '<p><strong>Empresa: </strong>' + document.getElementById('empresa' + e).value + ' ' + periodo_exp + '</p><p><strong>Cargo: </strong>' + document.getElementById('cargo' + e).value + '</p>';
        }
    }

    html += '<p><strong>_________________________________________________________________________________</strong></p>';
    html += '<h3>Formação Acadêmica</h3>';
    for (f = 0; f < countFormacao; f++) {
        var inicio_edu = document.getElementById('inicio_edu' + f).value;
        var final_edu = document.getElementById('final_edu' + f).value;
        var instituicao = document.getElementById('instituicao' + f).value;
        var curso = document.getElementById('curso' + f).value;
        var grau = document.getElementById('grau' + f).value;
        periodo_edu = " (" + inicio_edu + " - " + final_edu + ")";
        if (document.getElementById('instituicao' + f).value != '') {
            html += '<p><strong>Instituição: </strong>' + instituicao + periodo_edu + '</p><p><strong>Curso: </strong>' + grau + ' - ' + curso + '</p>';
        }
    }

    html += '<p><strong>_________________________________________________________________________________</strong></p>';
    html += '<h3>Competências</h3>';
    for (c = 0; c < countComp; c++) {
        var comp = document.getElementById('comp' + c).value;
        nivel = document.getElementById('nivel' + c).value
        if (nivel != '') {
            nivel = " (" + nivel + ")";
        }
        if (comp != '') {
            html += '<p>- ' + comp + nivel + '</p>';
        }
    }

    doc.fromHTML(html, 50, 50, {
        'width': 500,
        'elementHandlers': specialElementHandlers
    });
    doc.save('curriculo.pdf');
};