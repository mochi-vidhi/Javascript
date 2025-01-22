let btn_upload = document.querySelector('.btn-info');
let btn_download = document.querySelector('.btn-success');
btn_upload.addEventListener("click",(e)=>{
    e.preventDefault();
    const fileInput = document.querySelector('#filepicker');
    const image = fileInput.files[0];
    
    console.log(image);

    if(!image){
        alert("please select an image to upload!!");
        return; 
    }
    
    const formData = new FormData();
    formData.append("image_file",image);
    formData.append('size','auto');
    const apikey = '5U69Pd29hCM1N3HKrZoH5bc2';

    fetch('https://api.remove.bg/v1.0/removebg',{
        method:'POST',
        headers:{
            'X-Api-Key':apikey,
        },
        body:formData
    })
    .then((response)=>{
        if(!response.ok){
            throw new Error('Failed to remove background!');
        }
        return response.blob();// raw binary large object
    })
    .then((blob)=>{
        const url = URL.createObjectURL(blob);
        const img = document.createElement('img');
        img.setAttribute('src',url);
        img.classList.add('img-fluid','rounded','shadow','mt-3');


        let outputContainer = document.querySelector('#output-container');
        outputContainer.innerHTML = ''; // clear previous img
        outputContainer.appendChild(img);

        btn_download.style.display = 'inline-block';
        btn_download.setAttribute('href',url);
        btn_download.setAttribute('download', 'background_removed.png'); 
        
        btn_download.addEventListener("click", () => {
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        });
    
    })
    .catch((error)=>{
        console.error(error);
        alert('An Error occured while processing the image');
    });
})