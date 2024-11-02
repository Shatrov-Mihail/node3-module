document.addEventListener("click", event => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id

        remove(id).then(() => {
            event.target.closest(`li`).remove()
        })
    }

    if (event.target.dataset.type === 'edit') {
        const id = event.target.dataset.id

        const newTitle = prompt('Введите новое название:');
        if (newTitle) {
            update(id, newTitle).then(() => {
                const note = event.target.closest('li');
                note.querySelector('span').innerHTML = newTitle;
            })
        }
    }
})

async function update(id, title) {
    await fetch(`/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id,
            title
        })
    })
}

async function remove(id) {
    await fetch(`/${id}`, {
        method: 'DELETE'
    })
}


//
// document.addEventListener("click", event => {
//     const editButtons = document.querySelectorAll('.edit-button');
//
//     editButtons.forEach(button => {
//         button.addEventListener('click', async (event) => {
//             const noteId = event.target.dataset.id;
//             const currentTitle = event.target.parentElement.previousSibling.textContent.trim();
//
//             const newTitle = prompt("Введите новое название:", currentTitle);
//
//             if (newTitle !== null) {
//                 try {
//                     const res = await fetch(/notes/${noteId}, {
//                         method: 'PUT',
//                         headers: {
//                             'Content-Type': 'application/json',
//                         },
//                         body: JSON.stringify({ title: newTitle }),
//                     });
//
//                     if (res.ok) {
//
//                         event.target.parentElement.previousSibling.textContent = newTitle;
//                     } else {
//                         alert("Ошибка при обновлении заметки.");
//                     }
//                 } catch (error) {
//                     console.error("Ошибка:", error);
//                 }
//             }
//         });
//     });
// });
