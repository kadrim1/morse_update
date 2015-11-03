var web_storage = false;
var guessed_words = 0;
var sessioon = false;
var game = false;
var audio_play = false;
var morse_code, pList, closed_count, playlist;

var word_for_guess = '';

var all_words = ['esthetic', 'gubernatorial', 'raisins', 'nullifying', 'concretes', 'kabbala', 'maidenheads']

var words = all_words.slice();
var score_points = 0;
var mistakes = 0;
var game_expiry = 3; //määrab ära mitme minuti jooksul sessioon aegub

var play_speed = 1.0; //morsesignaali mahamängimis kiirus

var any_action = false;

var game_rules = 'Listen to morse signal and guess what letters are played.' +
    ' The exercise is in hangman game style.' +
    ' You can make up to 6 mistakes.' +
    ' Every correct letter gives you 1 point. But be careful, each incorrect guess takes a point off!'
//

// MORSE OSAD

var m_code = {

    //        "'": '.----.',
    //        '(': '-.--.-',
    //        ')': '-.--.-',
    //        ',': '--..--',
    //        '-': '-....-',
    //        '.': '.-.-.-',
    //        '/': '-..-.',
    //        '0': '-----',
    //        '1': '.----',
    //        '2': '..---',
    //        '3': '...--',
    //        '4': '....-',
    //        '5': '.....',
    //        '6': '-....',
    //        '7': '--...',
    //        '8': '---..',
    //        '9': '----.',
    //        ':': '---...',
    //        ';': '-.-.-.',
    //        '?': '..--..',
    'A': '.-',
    'B': '-...',
    'C': '-.-.',
    'D': '-..',
    'E': '.',
    'F': '..-.',
    'G': '--.',
    'H': '....',
    'I': '..',
    'J': '.---',
    'K': '-.-',
    'L': '.-..',
    'M': '--',
    'N': '-.',
    'O': '---',
    'P': '.--.',
    'Q': '--.-',
    'R': '.-.',
    'S': '...',
    'T': '-',
    'U': '..-',
    'V': '...-',

//    'Ä': '.-.-',
//    'Ö': '---.',
//    'Ü': '..--',
//    'Õ': '..--',

    'W': '.--',
    'X': '-..-',
    'Y': '-.--',
    'Z': '--..'
}

var randrange = function (bottom, top) {
    return Math.floor(Math.random() * (1 + top - bottom)) + bottom;
}

var text_to_code = function (text) {
    var morseMsg = '';
    for (i = 0; i < text.length; i++) {
        if (text[i] != ' ') {
            character = m_code[text[i].toUpperCase()];
            (i != text.length - 1) ? morseMsg += character + ' ' : morseMsg += character;
        } else {
            morseMsg += '\t';
        }
    }
    return morseMsg
}

function code_to_playlist(mMsg) { //võtab argumendina sisse morsekoodi sõnena
    playlist = [];
    mItem = ''
    for (i = 0; i < mMsg.length; i++) {
        if (mMsg[i] == '.') {
            mItem = 'dot'
        } //dot – lühike signaal
        else if (mMsg[i] == '-') {
            mItem = 'dash'
        } //dash – pikk signaal
        else if (mMsg[i] == ' ') {
            mItem = ' '
        } //tühik jäätakse tähtese vahel
        playlist.push(mItem);
    }
    return playlist; //tagastab esitusloendi signaali mängimiseks järjendi faili nimedest
}

function visual_signal(symbol, speed) { //funktsioon vahetab morsesignaali järgi
    symbol_length = 100
    if (symbol === 'dash') {
        symbol_length = 300
    }
    ;
    if (symbol === 'dot') {
        symbol_length = 100
    }
    ;
    if (symbol != ' ') {
        $('#visual').html($('<img src="PICS/lamp_on.png">'));
        setTimeout(function () {
            $('#visual').html($('<img src="PICS/lamp_off.png">'));
        }, symbol_length / speed);
    }

}


function play_morse(playlist, word_index) {

    play_speed = parseFloat($('#speed').val());
    audio_volume = parseFloat($('#heli_tugevus').val());
    audio_play = true;
    $(replay).fadeTo(500, 0);
    if (word_index == 0) {
        paint_word(word_index);
    } //muudab mängitava hetkel mängitava tähe värvi

    audio = new Audio();
    morse_symbol = playlist.shift();
    audio.src = "SOUND/" + morse_symbol + '.mp3';
    audio.loop = false;
    audio.volume = audio_volume;
    audio.playbackRate = play_speed;


    audio.play();
    visual_signal(morse_symbol, play_speed);

    audio.addEventListener("ended", function () {

        if (playlist.length > 0) {
            morse_symbol = playlist.shift();
            //console.log(morse_symbol, playlist.length);
            if (morse_symbol != ' ') {
                audio.src = "SOUND/" + morse_symbol + '.mp3';

                audio.playbackRate = play_speed;
                audio.play();
                visual_signal(morse_symbol, play_speed);

            } else {
                word_index += 1;
                paint_word(word_index);
                setTimeout(function () {
                    play_morse(playlist, word_index)
                }, ~~300 / play_speed);
            }
        } else {
            audio_play = false;


            if (game) {
                $(s).hide();
                $(replay).fadeTo(1000, 1);
            }
            if (word_index == 101) {
                $(symbol).css('background-color', 'white');
            }
        }
    });
}

function paint_word(indx) {

    $('.' + indx.toString()).css('color', 'red');
    if (indx > 0) {
        $('.' + (indx - 1).toString()).css('color', 'black');
    }
    if (word_for_guess.length == indx + 1) {
        setTimeout(function () {
            $('.' + indx.toString()).css('color', 'black');
        }, 2000);
    }
}


function find_word_for_guess() {

    if (words.length < 100) {
        words = all_words.slice();
    }
    word_for_guess = words.splice(randrange(0, words.length), 1)[0]; //leiab arvatava sõna ja samas eemaldab selle wordse järjendist
    morse_code = text_to_code(word_for_guess);
    pList = code_to_playlist(morse_code);

    return word_for_guess;
}

function show_results(valed, score_points) {

    $('#valed').text('Mistakes : ' + mistakes + ' ');
    $('#punktid').text('Score : ' + score_points + ' ');
    $('#sonad').css({
        'width': '200px',
        'color': 'green'
    }).text('Guessed : ' + guessed_words + ' words' + ' ');


    if (web_storage) {
        high_score = localStorage.getItem("high_score");

        if (high_score !== null) {
            high_score = high_score.split(' ');
            best_result = '(Record : ' + high_score[0] + ' points / ' + high_score[1] + ' words' + ')';


            $('#rekord').css({
                'color': 'red',
                'width': '300px'
            }).text(best_result);

        }
    }

}

function game_session(status) {
    if (status) {
        if (typeof (Storage) !== "undefined") {
            web_storage = true;
            $('#game_counter').text('Used: ' + localStorage.getItem("game_count") + ' times.');
        }
        any_action = true;
        game = true;
        sessioon = true;
    } else {
        if (web_storage) {
            n = localStorage.getItem("game_count");
            if (n === null) {
                n = 1;
            } else {
                n = parseInt(n) + 1;
            }
            localStorage.setItem("game_count", n.toString());
            console.log(' MÄNG nr: ' + n.toString());

            high_score = score_points.toString() + ' ' + guessed_words.toString();
            best = localStorage.getItem("high_score");

            if (best === null) {
                localStorage.setItem("high_score", high_score);
            } else {
                best = parseInt(best.split(' ')[0])
                if (best < score_points) {
                    localStorage.setItem("high_score", high_score);
                }

            }
        }
        score_points = 0;
        mistakes = 0;
        guessed_words = 0;
        game = false;
        sessioon = false;
        morse_alpha_table();
    }

}

function hangman() { // Käivitab poomismängu stiilis arvamismängu, kus arvatavat sõna mängitakse morsesignaali kujul

    $('#alpha').html('');
    $('#pilt').html($('<img src="PICS/' + mistakes.toString() + '.png">'));
    $('#visual').html($('<img src="PICS/lamp_off.png">'));

    var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $.each(alpha.split(''), function (i, val) {
        val_morse = ' ' + m_code[val];
        $('#alpha').append($('<div class="guess" STYLE="color: red;">' + val + '<span STYLE="color: blue;">' + val_morse + '</span> </div>'));
    });
    $.each(word.split(''), function (i, val) {

        $('#word').append($('<span class=' + i + ' letter="' + val + '">_</span>'));
    });
    $('.guess').click(function () {

        any_action = true;

        alpha_letter = $(this).text()[0]; //täht, mida pakuti
        if (game) {
            var count = $('#word [letter=' + alpha_letter + ']').each(function () {
                $(this).text($(this).attr('letter'));
            }).length; //loendur count loeb kokku mitu tähte oli arvatavas sõnas

            $(this).removeClass('guess').css('color', (count > 0 ? 'limegreen' : 'red')).unbind('click');

            $(this).fadeOut(1000);

            if (count == 0) { //Kui pakutud tähte ei olnud sõnad...

                mistakes++; //vigade loendur = +1
                if (score_points > 0) {
                    score_points -= 1;
                } // Kui punkte on rohkem kui 0, siis võetakse iga vea korral 1 punkt maha, aga kui juba on 0, siis negatiivseid punkte ei teki

                show_results(mistakes, score_points);

                $('#pilt').html($('<img src="PICS/' + mistakes.toString() + '.png">')); //näitame uut pilti

                if (mistakes == 7) { //Kui on tehtud 7 viga, siis on mäng läbi
                    $(s).show();
                    $(s).text('TRY AGAIN!');
                    game_session(false);
                    $(replay).hide();
                    morse_alpha_table();

                    $('#word span').each(function (index) { //Näitame arvamatta jäänud sõna
                        if ($(this).text() == '_') {
                            $(this).text($(this).attr('letter'));
                        }
                    });
                }
            } else { //Kui pakutud täht on arvatavas sõnas
                score_points++;
                $(s).text('NEXT WORD!');

                show_results(mistakes, score_points);
            }

            closed_count = 0;
            $('#word span').each(function (index) {
                if ($(this).text() == '_') {
                    closed_count += 1;
                }
            });

            if (closed_count == 0 & game) {
                $(s).show();
                game = false; //Kõik sai arvatud, arvaja jäi ellu!

                $('#pilt').html($('<img src="PICS/elus.png">'));

                $(replay).hide();
                guessed_words++;

                show_results(mistakes, score_points);
                console.log(guessed_words);

                morse_alpha_table();
            }
        }
    });
}


function morse_alpha_table() {

    $('#alpha').html('');
    $.each(m_code, function (index, value) {
        $('#alpha').append($('<div id="symbol"><span STYLE="color: red;">' + index + '</span ><span>  ' + value + '</span></div>'));

    });
    $(symbol).click(function () {
        chr = $(this).text()[0];
        // console.log('morse symbol: ',chr)

        if (!audio_play) { //Kui parasjagu midagi muud ei mängi...
            play_morse(code_to_playlist(text_to_code(chr)), 101);
            $(this).css('background-color', 'yellow');
        }

    });
}

function check_if_sleep(n) {
    if (any_action) {
        n = 0;
        any_action = false;
    }
    n++;
    //console.log(n);
    if (n === game_expiry) {
        game_session(false);
        $('#speed').text('1.0');
        $('#rate').val('1.0');
        beginning(); //läheme tagasi beginningesse ja muudame signaalikiiruse tagasi algsele väärtusele (1.0)
        $('#heli_tugevus').text('0.5');
        $('#volume').val('0.5');
    }

    setTimeout(function () {
        check_if_sleep(n)
    }, 60000);
}

function beginning() {

    any_action = false;

    $(replay).hide();
    $(s).text('START');
    $(s).show();
    $('#word').text(game_rules);
    $('#valed').text('');
    $('#punktid').text('');
    $('#sonad').text('');
    $('#visual').html($('<img src="PICS/lamp_off.png">'));

}
$(document).ready(function () {

    $('#bg-page').fadeTo(500, 0.02)

    if (typeof (Storage) !== "undefined") {
        web_storage = true;
        $('#game_counter').text('Used: ' + localStorage.getItem("game_count") + ' times.');
    }

    beginning();

    $(replay).hide();
    check_if_sleep(0);

    $(s).click(function () {
        //hävitame olemasolevad elemndid, vajalik kui eelnevalt on sõnu juba arvatud!
        $('#bg-page').fadeTo(200, 0.2)
        $('#bg-page').fadeTo(1000, 0.02)

        sessioon = true;

        $(s).fadeOut(500);

        $('#word').html('');

        game_session(true);
        mistakes = 0;
        word_for_guess = find_word_for_guess();

        pList = code_to_playlist(text_to_code(word_for_guess));

        word = word_for_guess.toUpperCase();

        hangman();
        show_results(mistakes, score_points);
        setTimeout(function () {
            play_morse(pList, 0);
        }, 1000);

    });

    $(replay).click(function () {
        //hävitame olemasolevad elemndid, vajalik kui eelnevalt on sõnu juba arvatud!
        if (!audio_play) {
            pList = code_to_playlist(text_to_code(word_for_guess));
            play_morse(pList, 0);
        }
        any_action = true;

    });
    morse_alpha_table();

});
