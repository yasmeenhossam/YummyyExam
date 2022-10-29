let Name;
let Phone;
let Email;
let Age;
let Password;
let RePassword;
let Name2;
let Phone2;
let Email2;
let Age2;
let password2;
let Repassword2;

search("").then(() => {
    $(".loading-screen").fadeOut(500, () => {
        $("body").css("overflow", "visible")
    })
})

var Navbarwid = 0,
    isTrue = !0,
    arr = [];

$(".strip-toggel-menu").click(function () {
    isTrue ? ($(".navbarmenu").addClass("open-menu").removeClass("close-menu"), Navbarwid = $(".navbarmenu").width() - 10, $(".strip-header-nav").css("left", Navbarwid), $(".fa-align-justify").toggleClass("fa-times"), $(".navbarmenu .item1").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1100), $(".navbarmenu .item2").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1200), $(".navbarmenu .item3").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1300), $(".navbarmenu .item4").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1400), $(".navbarmenu .item5").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1500), $(".navbarmenu .item6").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1600), isTrue = !isTrue) : ($(".navbarmenu").addClass("close-menu").removeClass("open-menu"), $(".fa-align-justify").toggleClass("fa-times"), $(".strip-header-nav").css("left", 0), $(".navbarmenu li").animate({
        opacity: "0",
        paddingTop: "500px"
    }, 500), isTrue = !isTrue)
});

var SearchTrue = !0;
$(".strip-search").click(function () {
    SearchTrue ? ($(".search").addClass("open-menu").removeClass("close-search"), $(".fa-search").toggleClass("fa-times"), $(".search-input").animate({
        top: "49%"
    }, 1500, function () {
        $(".search-input").animate({
            top: "50%"
        }, 250)
    }), SearchTrue = !SearchTrue) : ($(".search").addClass("close-search").removeClass("open-menu"), $(".fa-search").toggleClass("fa-times"), $(".search-input").animate({
        top: "300%"
    }), SearchTrue = !SearchTrue)
});

var row = document.getElementById("rowData");






async function search(q) {
    $(".loading-container").fadeIn(100)
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`)
    meals = await meals.json()
    Mealss(meals.meals)
    $(".loading-container").fadeOut(400)
    return meals
}


function Categories() {
    let C = ""
    for (var i = 0; i < arr.length; i++) C += `
    <div class="col-md-6 col-lg-3 my-3 myM shadow">
        <div class="movie shadow rounded position-relative">
            <div onclick="selectCategory('${arr[i].strCategory}')" class="post">
                <img src='${arr[i].strCategoryThumb}' class="w-100 rounded" />
                <div class="layer d-flex align-items-center ">
                    <div class="info p-2">
                        <h2>${arr[i].strCategory}</h2>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    row.innerHTML = C
    $("html, body").animate({
        scrollTop: 0
    }, 200)
}

function Area() {
    let C = ""
    for (var i = 0; i < arr.length; i++) C += `
    <div class="col-md-6 col-lg-3 my-3 myM  shadow">
        <div class="movie shadow rounded position-relative">
            <div onclick=(selectArea('${arr[i].strArea}')) class="post ">
                <i class="fa-solid fa-city colorcity fa-3x"></i>
                <h2 class="text-white">${arr[i].strArea}</h2>
            </div>
        </div>
    </div>`
    row.innerHTML = C
    $("html, body").animate({
        scrollTop: 0
    }, 200)


}

function Ingredients() {
    let C = ""
    for (var i = 0; i < arr.length; i++) C += `
    <div class="col-md-6 col-lg-3 my-3 myM  shadow">
        <div onclick="getMainIngredient('${arr[i].strIngredient}')" class="movie shadow rounded position-relative">
            <div class="post ">
                <i class="fa-solid fa-bowl-food coloriintg fa-3x"></i>
                <h2 class="text-white">${arr[i].strIngredient}</h2>
                <p class="text-white">${arr[i].strDescription.split(" ").splice(0,20).join(" ")}</p>
            </div>
        </div>
    </div>`
    row.innerHTML = C
    $("html, body").animate({
        scrollTop: 0
    }, 200)
}

async function getMainIngredient(mealName) {
    $(".loading-container").fadeIn(100)
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealName}`)
    meal = await meal.json()
    Mealss(meal.meals)
    $(".loading-container").fadeOut(500)
}

function Mealss(arr) {

    let meals = ""
    for (let i = 0; i < arr.length; i++) {
        meals += `
        <div class="col-md-6 col-lg-3 my-3 myM  shadow">
            <div onclick="getMeal('${arr[i].idMeal}')" class="movie shadow rounded position-relative">
                <div class="post ">
                    <img src='${arr[i].strMealThumb}' class="w-100 rounded" />
                    <div class="layer d-flex align-items-center ">
                        <div class="info p-2">
                            <h2>${arr[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    }
    row.innerHTML = meals
    $("html, body").animate({
        scrollTop: 0
    }, 200)
}

async function getMeal(mealID) {
    $(".loading-container").fadeIn(100)
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    meal = await meal.json()
    Meal(meal.meals[0])
    $(".loading-container").fadeOut(500)
}

function Meal(meal) {
    let recipes = ""
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            recipes += `<li class="my-3 mx-1 p-1 alert-success rounded">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",") 
    let tagsStr = ""
    for (let i = 0; i < tags?.length; i++) { 
        tagsStr += `<li class="my-3 mx-1 p-1 alert-danger rounded">${tags[i]}</li>`
    } 

    let str = `
    <div class="col-md-4 myM text-white">
					<img class="w-100" src="${meal.strMealThumb}" alt=""
						srcset=""><br>
					<h1>${meal.strMeal}</h1>
				</div>
				<div class="col-md-8 myM text-white text-left">
					<h2>Instructions</h2>
					<p>${meal.strInstructions}</p>
					<p><b class="fw-bolder">Area :</b> ${meal.strArea}</p>
					<p><b class="fw-bolder">Category :</b> ${meal.strCategory}</p>
					<h3>Recipes :</h3>
					<ul class="d-flex " id="recipes">
					</ul>

					<h3 class="my-2 mx-1 p-1">Tags :</h3>
					<ul class="d-flex " id="tags">
                    <li class="my-3 mx-1 p-1 alert-danger rounded">Soup</li>
					</ul>

					
					<a class="btn btn-success text-white" target="_blank" href="${meal.strSource}">Source</a>
					<a class="btn youtube text-white" target="_blank" href="${meal.strYoutube}">Youtub</a>
				</div>`
    row.innerHTML = str
    document.getElementById("recipes").innerHTML = recipes
    document.getElementById("tags").innerHTML = tagsStr
    $("html, body").animate({
        scrollTop: 0
    }, 200)

}

async function getCategories(lista) {
    x = await fetch(`https://www.themealdb.com/api/json/v1/1/${lista}`);
    x = await x.json()
    return x;

}

async function getletter(letter) {
    if (letter) {
        $(".loading-container").fadeIn(100)
        let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
        meals = await meals.json()
        if (meals.meals) {
            Mealss(meals.meals)
        }
        $(".loading-container").fadeOut(100)
    }
}

async function selectCategory(category) {
    $(".loading-container").fadeIn(100)
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    meals = await meals.json()
    Mealss(meals.meals)
    $(".loading-container").fadeOut(500)
}

async function SelectArea(area) {
    $(".loading-container").fadeIn(100)
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    meals = await meals.json()
    Mealss(meals.meals.slice(0, 20))
    $(".loading-container").fadeOut(500)
}


$(".navitem a").click(async (C) => {
    let lista = C.target.getAttribute("data-list")

    document.getElementById("search-container").innerHTML = ""
    row.innerHTML = ""
    $("html, body").animate({
        scrollTop: 0
    }, 200)

    if (lista == "contact") {

        row.innerHTML = `
        <section id="contact" class="container myM w-75 mx-auto mb-5 ">
		<div class="p-2">
			<h2 class="text-light mb-5">ContacUs...</h2>
			<div class="row  ">
				<div class="col-md-6 pb-3 ">
					<div class="form-group ">
						<input class="form-control  inputcont text-center" onkeyup="validation()" id="name"
							placeholder="Enter Your Name">
						<div class="alert mt-1 alert-danger d-none" id="Name2" role="alert">
							Special Characters and Numbers not allowed
						</div>
					</div>
				</div>
				<div class="col-md-6 pb-3">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control inputcont text-center" id="email" placeholder="Enter Email">
						<div class="alert mt-1 alert-danger d-none" id="Email2" role="alert">
							Enter valid email. *Ex: xxx@yyy.zzz
						</div>
					</div>
				</div>
				<div class="col-md-6 pb-3 ">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control inputcont text-center" id="phone" placeholder="Enter phone">
						<div class="alert mt-1 alert-danger  d-none" id="Phone2" role="alert">
							Enter valid Phone Number
						</div>
					</div>
				</div>
				<div class="col-md-6 pb-3 ">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control inputcont text-center" id="age" placeholder="Enter Age">
						<div class="alert mt-1 alert-danger  d-none" id="Age2" role="alert">
							Enter valid Age
						</div>
					</div>
				</div>
				<div class="col-md-6 pb-3 ">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control inputcont text-center" type="password" id="password"
							placeholder="Enter Password">
						<div class="alert mt-1 alert-danger  d-none" id="password2" role="alert">
							Enter valid password *Minimum eight characters, at least one letter and one number:*
						</div>
					</div>
				</div>
				<div class="col-md-6 pb-3 ">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control inputcont text-center" type="password" id="rePassword"
							placeholder="Enter RePassword">
						<div class="alert mt-1 alert-danger  d-none" id="repassword2" role="alert">
							Enter valid Repassword
						</div>
					</div>
				</div>


			</div>

			<button type="submit" disabled id="submitBtn" class="btn btn-outline-danger mt-3">Submit</button>
		</div>

	</section>`
        Name = document.getElementById("name"),
            Email = document.getElementById("email"),
            Phone = document.getElementById("phone"),
            Age = document.getElementById("age"),
            Password = document.getElementById("password"),
            RePassword = document.getElementById("rePassword"),
            Name2 = document.getElementById("Name2"),
            Email2 = document.getElementById("Email2"),
            Phone2 = document.getElementById("Phone2"),
            Age2 = document.getElementById("Age2"),
            password2 = document.getElementById("password2"),
            Repassword2 = document.getElementById("repassword2");

        Name.addEventListener("focus", () => {
            nameToached = true
        })
        Email.addEventListener("focus", () => {
            emailToached = true
        })
        Phone.addEventListener("focus", () => {
            phoneToached = true
        })
        Age.addEventListener("focus", () => {
            ageToached = true
        })
        Password.addEventListener("focus", () => {
            passwordToached = true
        })
        RePassword.addEventListener("focus", () => {
            repasswordToached = true
        })
    }
    if (lista == "search") {
        row.innerHTML = ""
        document.getElementById("search-container").innerHTML = `
        <div class="row">
				<div class="col-md-6"><input id="searchInput" class="form-control mb-2 " placeholder="Search By Name">
				</div>
				<div class="col-md-6">
					<input class="form-control " type="text" maxlength="1" id="letter"
						placeholder="search By First Letter...">
				</div>

			</div>`

        $("#searchInput").keyup((C) => {
            search(C.target.value)
        })
        $("#letter").keyup((C) => {
            getletter(C.target.value)
        })

        $('#letter').on("input", function () {
            if (this.value.length > 1)
                this.value = this.value.slice(0, 1);
        });
    }


    let click_event = new CustomEvent('click');
    document.querySelector('.strip-toggel-menu').dispatchEvent(click_event);

    let x;

    if (lista == "categories") {
        $(".loading-container").fadeIn(100)

        x = await getCategories(lista + ".php")
        arr = x.categories.splice(0, 20);
        Categories()
        $(".loading-container").fadeOut(500)
    } else if (lista == "a") {
        $(".loading-container").fadeIn(100)

        x = await getCategories("list.php?a=list")
        arr = x.meals.splice(0, 20);
        Area()
        $(".loading-container").fadeOut(500)
    } else if (lista == "i") {
        $(".loading-container").fadeIn(100)

        x = await getCategories("list.php?i=list")
        arr = x.meals.splice(0, 20);
        Ingredients()
        $(".loading-container").fadeOut(500)
    }





})

$(document).scroll((C) => {

    if ($(document).scrollTop()) {
        $(".mmm").css("backgroundColor", "#0D0D0D")
    }
})


let nameToached = false,
    emailToached = false,
    phoneToached = false,
    ageToached = false,
    passwordToached = false,
    repasswordToached = false;

function validation() {

    if (nameToached) {
        if (Nameofvalidation()) {
            Name.classList.remove("is-invalid")
            Name.classList.add("is-valid")
            Name2.classList.replace("d-block", "d-none")
            Name2.classList.replace("d-block", "d-none")

        } else {
            Name.classList.replace("is-valid", "is-invalid")
            Name2.classList.replace("d-none", "d-block")
        }
    }

    if (emailToached) {
        if (Emailofvalidation()) {
            Email.classList.remove("is-invalid")
            Email.classList.add("is-valid")
            Email2.classList.replace("d-block", "d-none")
            Email2.classList.replace("d-block", "d-none")
        } else {
            Email.classList.replace("is-valid", "is-invalid")
            Email2.classList.replace("d-none", "d-block")
        }
    }

    if (phoneToached) {
        if (Phoneofvalidation()) {
            Phone.classList.remove("is-invalid")
            Phone.classList.add("is-valid")
            Phone2.classList.replace("d-block", "d-none")
            Phone2.classList.replace("d-block", "d-none")
        } else {
            Phone.classList.replace("is-valid", "is-invalid")
            Phone2.classList.replace("d-none", "d-block")
        }
    }

    if (ageToached) {
        if (Ageofvalidation()) {
            Age.classList.remove("is-invalid")
            Age.classList.add("is-valid")
            Age2.classList.replace("d-block", "d-none")
            Age2.classList.replace("d-block", "d-none")
        } else {
            Age.classList.replace("is-valid", "is-invalid")
            Age2.classList.replace("d-none", "d-block")
        }
    }

    if (passwordToached) {
        if (passofvalidation()) {
            Password.classList.remove("is-invalid")
            Password.classList.add("is-valid")
            password2.classList.replace("d-block", "d-none")
            password2.classList.replace("d-block", "d-none")
        } else {
            Password.classList.replace("is-valid", "is-invalid")
            password2.classList.replace("d-none", "d-block")
        }
    }

    if (repasswordToached) {
        if (Repassofvalidation()) {
            RePassword.classList.remove("is-invalid")
            RePassword.classList.add("is-valid")
            Repassword2.classList.replace("d-block", "d-none")
            Repassword2.classList.replace("d-block", "d-none")
        } else {
            RePassword.classList.replace("is-valid", "is-invalid")
            Repassword2.classList.replace("d-none", "d-block")
        }
    }

    if(Nameofvalidation() && Emailofvalidation() && Phoneofvalidation() && Ageofvalidation() && passofvalidation() && Repassofvalidation()){
        document.getElementById("submitBtn").removeAttribute("disabled")
    }else{
        document.getElementById("submitBtn").setAttribute("disabled","true")
    }

}

function Nameofvalidation() {
    return /^[a-zA-Z ]+$/.test(Name.value)
}
function Phoneofvalidation() {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(Phone.value)
}

function Emailofvalidation() {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(Email.value)
}
function Ageofvalidation() {
    return /^[1-9][0-9]?$|^100$/.test(userAge.value)
}

function passofvalidation() {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(Password.value)
}

function Repassofvalidation() {
    return Password.value == RePassword.value
}
