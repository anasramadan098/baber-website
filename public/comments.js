
// Comments Section
const commentSection = document.querySelector('section.comments .boxes');


// Get Data
fetch('files/comments.json').then(res=> res.json()).then(data=> {
    // Loop On All Date'
    console.log(data);
    data.forEach((d,index) => {
        if (index < 6) {
            // Create Div
            const commentDiv = document.createElement('div');
            commentDiv.className = 'box';

            // Create Name Element
            const h3 = document.createElement('h3');
            if (d.name.length != 0) {
                h3.innerHTML = d.name;
            } else {
                h3.innerHTML = 'Unknown User';
            }
            commentDiv.appendChild(h3);

            // Create Comment Element
            const p = document.createElement('p');
            p.innerHTML = d.comment;
            commentDiv.appendChild(p);

            // Append COmment Div To Page
            commentSection.appendChild(commentDiv);
        }
    });
})