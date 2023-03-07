const wrapper = document.querySelecter(".wrapper");
const toast = wrapper.querySelecter(".toast");
const wifiIcon = wrapper.querySelecter(".icon");
const title = wrapper.querySelecter("span");
const subTitle = wrapper.querySelecter("p");
const closeIcon = wrapper.querySelecter(".close-icon");

window.onload = () => {
    function ajax(){
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
        xhr.onload = () => {
            if(xhr.status == 200 && xhr.status < 300){
                toast.classList.remove("offline");
                title.innerText = "You're online now";
                subTitle.innerText = "Hurray! Internet is connected.";
                wifiIcon.innerText = '<i class="uil uil-wifi"></i>';
                
                closeIcon.onclick = () => {
                    wrapper.classList.add("hide");
                }

                setTimeout(() => {
                    wrapper.classList.add("hide");
                }, 5000);
            }else{
                offline();
            }
        }
        xhr.onerror = () => {
            offline();
        }
        xhr.send();
    }

    function offline(){
        wrapper.classList.remove("hide");
        toast.classList.add("offline");
        title.innerText = "You're offline now";
        subTitle.innerText = "Opps! Internet is disconnected.";
        wifiIcon.innerText = '<i class="uil uil-wifi-slash"></i>';
    }

    setInterval(() => {
        ajax();
    }, 100);
}