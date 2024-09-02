let upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let lowerSet = "abcdefghijklmnopqrstuvwxyz"
let numberSet = "1234567890"
let symbolSet = "~!@#$%^&*()_+/"

// selectors
let passBox = document.getElementById("pass-box");
let totalChar = document.getElementById("total-char");
let upperInput = document.getElementById("upper-case");
let lowerInput = document.getElementById("lower-case");
let numberInput = document.getElementById("numbers");
let symbolInput = document.getElementById("symbols");
let sliderValue = document.getElementById("sliderValue");
let copyIcon = document.getElementById("copyIcon");

sliderValue.textContent = totalChar.value;
totalChar.addEventListener('input', function () {
    sliderValue.textContent = totalChar.value;
})
let getRandomData = (dataSet) => {
    return dataSet[Math.floor(Math.random() * dataSet.length)]
}

let generatePassword = (password = "") => {
    if (upperInput.checked) {
        password += getRandomData(upperSet)
    }
    if (lowerInput.checked) {
        password += getRandomData(lowerSet)
    }
    if (numberInput.checked) {
        password += getRandomData(numberSet)
    }
    if (symbolInput.checked) {
        password += getRandomData(symbolSet)
    }
    if (password.length < totalChar.value) {
        return generatePassword(password)
    }

    passBox.innerText = truncateString(password, totalChar.value);
}

generatePassword();

document.getElementById("btn").addEventListener(
    "click",
    function () {
        generatePassword();
    }

)

function truncateString(str, num) {
    if (str.length > num) {
        let subStr = str.substring(0, num);
        return subStr;
    } else {
        return str;
    }
}

copyIcon.addEventListener('click', () => {
    if (passBox.value != "" || passBox.value.length >= 1) {
        navigator.clipboard.writeText(passBox.value);
        copyIcon.innerText = "check";
        copyIcon.title = "Password Copied";

        setTimeout(function () {
            copyIcon.innerHTML = "content_copy";
            copyIcon.title = "";
        }, 3000)
    }
})
