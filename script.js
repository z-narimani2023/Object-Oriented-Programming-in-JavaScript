const PostTitle = document.getElementById("post-title");
const PostAuthor = document.getElementById("post-author");
const PostText = document.getElementById("post-text");
const submitBtn = document.getElementById("post-form");
const form = document.querySelector("#post-form");
const col = document.querySelector('.col-sm-8');
const list = document.getElementById("post-list");


class Post {
    constructor(title, author, text) {
        this.title = title;
        this.author = author;
        this.text = text;
    }
}
class UI {
    addposttolist(post) {
        const list = document.getElementById("post-list")
        const row = document.createElement("tr")
        row.innerHTML = `
        <th>${post.title}</th>
        <td>${post.author}</td>
        <td>${post.text}</td>
        <td><i class="bi bi-x-lg delete"></i></td>
      `;
        list.appendChild(row);
    }
    Alert(message, messtyle) {
        const div = document.createElement('div');
        div.className = `alert alert-${messtyle}`;
        div.appendChild(document.createTextNode(message));
        col.insertBefore(div, form);
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);
    }
    clearInputs() {
        PostTitle.value = '';
        PostAuthor.value = '';
        PostText.value = '';
    }
    DeletePost(target) {
        target.parentElement.parentElement.remove();

    }
}

class store {
    static getposts() {
        let posts;
        if (localStorage.getItem('posts') === null) {
            posts = []
        } else {
            posts = JSON.parse(localStorage.getItem('posts'))
        }
        return posts;
    }
    static displayposts() {
        const posts = store.getposts();
        posts.forEach(function(post) {
            const ui = new UI;
            ui.addposttolist(post);
        });

    }
    static addposts(post) {
        const posts = store.getposts();
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts))
    }
    static removepost(title) {
        const posts = store.getposts();
        posts.forEach(function(post, index) {
            if (post.title === title) {
                posts.splice(index, 1);
            }
        });
        localStorage.setItem('posts', JSON.stringify(posts));
    }
}
document.addEventListener('DOMContentLoaded', store.displayposts);

function submit(e) {
    e.preventDefault();
    const Posttitle = PostTitle.value;
    const Postauthor = PostAuthor.value;
    const Posttext = PostText.value;
    const post = new Post(Posttitle, Postauthor, Posttext);
    const ui = new UI();
    if (Posttitle == '' || Postauthor == '' || Posttext == '') {
        ui.Alert('تمامی فیلد ها الزامی است.', 'danger');
    } else {
        ui.addposttolist(post);
        store.addposts(post);
        ui.Alert('پست اضافه شد!', 'success');
        ui.clearInputs();
        console.log(post);
        console.log(JSON.stringify(post));
    }
}


function deletepost(e) {
    e.preventDefault();
    const ui = new UI();
    if (e.target.classList.contains('delete')) {
        ui.DeletePost(e.target);
        const tr = e.target.parentElement.parentElement;
        const title = tr.firstElementChild.textContent;
        store.removepost(title);
        ui.Alert('پست حذف شد', 'success');
    }
}


submitBtn.addEventListener('submit', submit);
list.addEventListener('click', deletepost);