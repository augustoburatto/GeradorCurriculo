var countComp = 0;
var countFormacao = 0;
var countExper = 0;

function addExperiencias() {
    // var experiencias = document.getElementById('experiencias');
    $('#experiencias').append('<div class="col-sm-12 form-group"><div class="col-sm-3 form-group"><label>Empresa</label><input id="empresa' + countExper + '" class="form-control" /></div><div class="col-sm-3 form-group"><label>Cargo</label><input id="cargo' + countExper + '" class="form-control" /></div><div class="col-sm-2 form-group"><label>De</label><input type="date" id="data_inicio' + countExper + '" class="form-control" /></div><div class="col-sm-2 form-group"><label>Até</label><input type="date" id="data_final' + countExper + '" class="form-control" /></div><button id="experiencia' + countExper + '_rmv" class="btn btn-danger" onClick="removeCat(this, \'experiencias\')">-</button></div>');
    countExper++;
}

function addFormacao() {
    // var formacao = document.getElementById('formacoes');
    // formacao.innerHTML +=
    $('#formacoes').append('<div class="col-sm-12 form-group"><div class="col-sm-3 form-group"><label>Instituição</label><input id="instituicao' + countFormacao + '" class="form-control" /></div><div class="col-sm-3 form-group"><label>Curso</label><input id="curso' + countFormacao + '" class="form-control" /></div><div class="col-sm-3 form-group"><label>Conclusão</label><input type="date" id="conclusao' + countFormacao + '" class="form-control" /></div><button id="formacao' + countFormacao + '_rmv" class="btn btn-danger" onClick="removeCat(this, \'formacao\')">-</button></div>');
    countFormacao++;
}

function addCompetencia() {
    // var competencias = document.getElementById('competencias');
    $('#competencias').append('<div class="col-sm-6 form-group"><label>Descrição</label><input id="comp' + countComp + '" class="form-control" /><button id="comp' + countComp + '_rmv" class="btn btn-danger" onClick="removeCat(this, \'competencias\')">-</button></div>');
    countComp++;
}

function removeCat(campo, form_id) {
    // document.getElementById(campo.id).parentElement.style.display = 'none';
    $('#' + campo.id).parent().remove();
    if (form_id == "competencias") {
        countComp--;
    } else if (form_id == "formacao") {
        countFormacao--;
    } else {
        countExper--;
    }
}

function createPdf() {
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
    nasc = moment(nasc, "YYYY/MM/DD");
    nasc = nasc.format("DD/MM/YYYY");

    var html = '<h1>' + nome + '</h1><p><strong>Endereço: </strong>' + address + '</p><p><strong>Telenfoe: </strong>' + tel + '</p><p><strong>E-mail: </strong>' + email + '</p><p><strong>Data de Nascimento: </strong>' + nasc + '</p><p><strong>_________________________________________________________________________________</strong></p><h3>Sobre</h3><p>' + sobre + '</p>';

    html += '<p><strong>_________________________________________________________________________________</strong></p>';
    html += '<h3>Histórico Profissional</h3>';
    for (e = 0; e < countExper; e++) {
        var data_inicio = document.getElementById('data_inicio' + e).value;
        data_inicio = moment(data_inicio, "YYYY/MM/DD");
        data_inicio = data_inicio.format("DD/MM/YYYY");
        var data_final = document.getElementById('data_final' + e).value;
        if (document.getElementById('empresa' + e).value != '') {
            var periodo = '(' + data_inicio;
            if (data_final == '') {
                periodo += ' - momento';
            } else {
                data_final = moment(data_final, "YYYY/MM/DD");
                data_final = data_final.format("DD/MM/YYYY");
                periodo += ' - ' + data_final;
            }
            periodo += ")";
            html += '<p><strong>Empresa: </strong>' + document.getElementById('empresa' + e).value + ' ' + periodo + '</p><p><strong>Cargo: </strong>' + document.getElementById('cargo' + e).value + '</p>';
        }
    }

    html += '<p><strong>_________________________________________________________________________________</strong></p>';
    html += '<h3>Formação Acadêmica</h3>';
    for (f = 0; f < countFormacao; f++) {
        var conclusao = document.getElementById('conclusao' + f).value;
        conclusao = moment(conclusao, "YYYY/MM/DD");
        conclusao = conclusao.format("DD/MM/YYYY");
        if (document.getElementById('instituicao' + f).value != '') {
            html += '<p><strong>Instituição e Curso: </strong>' + document.getElementById('instituicao' + f).value + ' - ' + document.getElementById('curso' + f).value + '</p><p><strong>Conclusão: </strong>' + conclusao + '</p>';
        }
    }

    html += '<p><strong>_________________________________________________________________________________</strong></p>';
    html += '<h3>Competências</h3>';
    for (c = 0; c < countComp; c++) {
        var comp = document.getElementById('comp' + c).value;
        if (comp != '') {
            html += '<p>- ' + comp + '</p>';
        }
    }

    doc.fromHTML(html, 50, 50, {
        'width': 500,
        'elementHandlers': specialElementHandlers
    });
    doc.save('curriculo.pdf');
};