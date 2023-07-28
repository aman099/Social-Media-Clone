// SIDEBAR
const menuItems = document.querySelectorAll(".menu-item");

const messagesNotification = document.querySelector("#messages-notifications");
const messages = document.querySelector(".messages");
const message = document.querySelectorAll(".message");
const messageSearch = document.getElementById("message-search");

// Action Buttons
const faThumbsUp = document.querySelectorAll(".fa-thumbs-up");
const loveMe = document.querySelector(".loveMe");
const addition = document.querySelectorAll(".addition");
let counter = 0;

// Image Feed Enlarge
const imageEnlarge = document.querySelectorAll(".feed .photo img");
const modal = document.querySelector(".modal");
const overlay = document.getElementById("overlay");
const commentSection = document.querySelector(".comment-section");
const feedImg = document.querySelector(".feedImg");

// API for Image-Feed-Enlarge

const datas = [
  {
    caption: `
    <p><strong>Laila Paige</strong> Looking good dear!</p>
    <p><strong>Papa Doomia</strong> Nice attire babe</p>
    <p><strong>Larry Wheels</strong> Looking cute😘😘</p>
    <p><strong>Mojo Jojo</strong> Amazing</p>
    `,
  },
  {
    caption: `
    <p><strong>Danny Gonzalves</strong> Nice click dude</p>
    <p><strong>Johnny Shrev</strong> Man I want those shades</p>
    <p><strong>John Snow</strong> Pose Pose Pose😂</p>
    <p><strong>John Doe</strong> Yea imma judge u🤣🤣</p>
    `,
  },
  {
    caption: `
    <p><strong>Babatunde</strong> Mother Nature is a blessing😊</p>
    <p><strong>Paul Heyman</strong> What's all these sunflowers lol</p>
    <p><strong>Kakarot Tazmania</strong> Where u at exactly girl?</p>
    <p><strong>Maira James</strong> Phenominal😃</p>
    `,
  },
  {
    caption: `
    <p><strong>Saul Goodman</strong> Nice Trio</p>
    <p><strong>Walter White</strong> Been to a football match??</p>
    <p><strong>Gustavo Fring</strong> Nice smile gals😁</p>
    <p><strong>Rakesh Sharma</strong> Looking beautiful like always😘😍</p>
    `,
  },
  {
    caption: `
    <p><strong>Jessy Pinkman</strong> Smoking my G😁</p>
    <p><strong>Jack Hamilton</strong> Ayooo</p>
    <p><strong>Kim Carla</strong> Keep it rocking</p>
    <p><strong>Mike Hannigan</strong> Straight up banger😎</p>
    `,
  },
  {
    caption: `
    <p><strong>Martha Jackson</strong> Geek Freak😂</p>
    <p><strong>Rhona James</strong> Don't f up ur eyes bro</p>
    <p><strong>Alexander Flamings</strong> work hard dude</p>
    <p><strong>Jane Dawson</strong> Nice view back there</p>
    `,
  },
  {
    caption: `
    <p><strong>Paula Johnson</strong> Office life is a pain😣</p>
    <p><strong>Victor Gonzalves</strong> Man I need a job too</p>
    <p><strong>Dana White</strong> Looking gorgeus girl🥰</p>
    <p><strong>Ashley Robbins</strong> Hot😁</p>
    `,
  },
];

// ************** User List Script *****************
const result = document.getElementById("result");
const filter = document.getElementById("filter");

const listItems = [];

// For recieving the Live-Users API
getData();

filter.addEventListener("click", userListAppear);

filter.addEventListener("input", (e) => filterData(e.target.value));

async function getData() {
  const res = await fetch("https://randomuser.me/api?results=50");

  const { results } = await res.json();

  // Clear results
  result.innerHTML = "";

  results.forEach((person) => {
    const li = document.createElement("li");

    listItems.push(li);

    li.innerHTML = `
      <img src="${person.picture.large}" alt="${person.name.first}" />
      <div class="user-info">
          <h4>${person.name.first} ${person.name.last}</h4>
          <p>${person.location.city}, ${person.location.country}</p>
      </div>
    `;

    result.appendChild(li);
  });
}

function userListAppear() {
  result.classList.toggle("hide");
}

function filterData(searchTerm) {
  listItems.forEach((item) => {
    if (item.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  });
}

// *******************Live-User-API ********************

// remove active class from all menu-items
const changeActiveItem = () => {
  menuItems.forEach((item) => {
    item.classList.remove("active");
  });
};

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    changeActiveItem();
    item.classList.add("active");

    if (item.id !== "notifications") {
      document.querySelector(".notifications-popup").style.display = "none";
    } else {
      document.querySelector(".notifications-popup").style.display = "block";
      document.querySelector(
        "#notifications .notification-count"
      ).style.display = "none";
    }
  });
});

// Search messages Chat
const searchMessage = () => {
  const val = messageSearch.value.toLowerCase();
  message.forEach((user) => {
    let name = user.querySelector("h5").textContent.toLowerCase();
    if (name.indexOf(val) != -1) {
      user.style.display = "flex";
    } else {
      user.style.display = "none";
    }
  });
};

messageSearch.addEventListener("keyup", searchMessage);

// Messages Highlight when menu item clicked
messagesNotification.addEventListener("click", () => {
  messages.style.boxShadow = "0 0 1rem var(--color-primary)";
  messagesNotification.querySelector(".notification-count").style.display =
    "none";
  setTimeout(() => {
    messages.style.boxShadow = "none";
  }, 2000);
});

// Action Buttons Scripts
faThumbsUp.forEach((thumbsUp) =>
  thumbsUp.addEventListener("click", (e) => {
    console.log(e.target);
    e.target.style.color = "blue";
    // e.target.style.transform = "scale(2)";
    e.target.classList.add("enlarge");
    setTimeout(() => {
      e.target.classList.remove("enlarge");
    }, 1200);
    counter++;

    e.target.parentElement.parentElement.parentElement.nextElementSibling
      .querySelector(":nth-child(4)")
      .querySelector(".addition").textContent += " , You ";
  })
);

// Image Feed Enlarge on clicking
// const getBig = () => {};

imageEnlarge.forEach((img) => {
  img.addEventListener("click", (e) => {
    console.log(e.target.dataset.id);

    modal.innerHTML = `
    <img data-id="1" class="feedImg" src="./images/feed-${
      e.target.dataset.id
    }.jpg" alt="" />
    <div data-id="1" class="comment-section">
      <div class="contain01">
        <input
          class="comment"
          type="text"
          placeholder="Comment something..."
        />
        <div class="caption">
            ${datas[e.target.dataset.id - 1].caption}
        </div>
        <small class="viewComments">View more comments...</small>
      </div>
    </div>
    `;

    modal.classList.add("active");
    overlay.classList.add("active");
  });
});

overlay.addEventListener("click", (e) => {
  modal.classList.remove("active");
  overlay.classList.remove("active");
});
