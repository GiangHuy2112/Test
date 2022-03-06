// var users = [
//     {
//         id: 1,
//         Name: 'Huy',
//         Age: 21
//     },

//     {
//         id: 2,
//         Name: 'Nam',
//         Age: 21
//     },

//     {
//         id: 3,
//         Name: 'Vi',
//         Age: 21
//     }

// ]

// var comments = [
//     {
//         id: 1,
//         user_id: 1,
//         Comment: 'Hello xin chào mọi người'
//     },

//     {
//         id: 2,
//         user_id: 2,
//         Comment: 'Mình là Jonny Dang'
//     },

// ]


// // 1.Lấy ra comments
// // 2.Từ comments lấy ra user_id
// // 3. Từ user_id lấy ra user tương ứng

// function getComments() {
//     return new Promise(function (resolve) {
//         resolve(comments);
//     });
// }

// getComments()
//     .then(function(comments) {
//         var userIds = comments.map(function(comment) {
//             return comment.user_id
//         });
        
//         return getUsersByIds(userIds) 
//             .then(function(users) {
//                 return {
//                     users : users,
//                     comments: comments
//                 };
//             });
//     })

//     .then(function(data) {
//         var comentBlock = document.getElementById('comment-block');
//         var html = '';
//         data.comments.forEach(function(comment) {
//             var user = data.users.find(function(user) {
//                 return user.id === comment.id;
//             })
//             html += `<li>${user.Name}: ${comment.Comment}</li>`
//         })

//         comentBlock.innerHTML = html;
//     })
    
// function getUsersByIds(userIds) {
//     return new Promise(function(resolve) {
//         var result = users.filter(function(user) {
//             return userIds.includes(user.id);
//         })       
//         resolve(result);       
//     })    
// }


var courseAPI = 'http://localhost:3000/courses';

function start() {
    getCourses(renderCoueses);
    handleCreateForm();

}

start();


// Functions
function getCourses(callback) {
    fetch(courseAPI)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

function createCourse(data,callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(courseAPI, options)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

function handleDeleteCourse(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },      
    };
    fetch(courseAPI + '/' + id, options)
        .then(function(response) {
            return response.json();
        })
        .then(function() {
            var courseItem = document.querySelector('.course-item-' + id);
            if(courseItem) {
                courseItem.remove();
            }
        });
}

function renderCoueses(courses) {
    var listCoursesBlock = document.querySelector('#list-courses');
    var htmls = courses.map(function(course) {
        return `
            <li class=course-item-${course.id}>
                <h4>${course.name}</h4>
                <p>${course.description}</p>
                <button onclick="handleDeleteCourse(${course.id})">Xóa</button>
            </li>
        `
    });
    listCoursesBlock.innerHTML = htmls.join('');
}

function handleCreateForm() {
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function() {
        var name = document.querySelector('input[name = "name"]').value
        var description = document.querySelector('input[name = "description"]').value
        
        var formData = {
            name: name,
            description: description
        }
        createCourse(formData,function() {
            getCourses(renderCoueses);
        });
    }
}