const form = document.getElementById('search-form');
const breedSelect = document.getElementById('breed-select');
const results = document.getElementById('results');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const selectedBreed = breedSelect.value;

  try {
    const response = await fetch(`https://api.thedogapi.com/v1/breeds`);
    const breeds = await response.json();

    console.log(breeds);

    if (breeds && breeds.length > 0) {
      let breedHtml = '';
      for (const breed of breeds) {
        const breedName = breed.name;
        const breedDescription = breed.description;
        const breedLifeSpan = breed.life_span;
        const breedTemperament = breed.temperament;
        const breedGroup = breed.breed_group;
       // let breedImage = 'https://via.placeholder.com/300';

        // Check if breed has a reference_image_id
       // if (breed.reference_image_id) {
         // const imageResponse = await fetch(`https://api.thedogapi.com/v1/images/${breed.reference_image_id}`);
         // const imageData = await imageResponse.json();
         // if (imageData && imageData.url) {
           // breedImage = imageData.url;
         // }
       // }

        if (selectedBreed === 'all' || breedName === selectedBreed) {
          breedHtml += `
            <div class="breed">
              <h3>${breedName}</h3>
              <p>Description: ${breedDescription || 'No description available.'}</p>
              <p>Life Span: ${breedLifeSpan || 'Unknown'}</p>
              <p>Temperament: ${breedTemperament || 'Unknown'}</p>
              <p>Breed Group: ${breedGroup || 'Unknown'}</p>
            </div>
          `;
        }
      }

      if (breedHtml) {
        results.innerHTML = breedHtml;
      } else {
        results.innerHTML = 'No results found.';
      }
    } else {
      results.innerHTML = 'No results found.';
    }
  } catch (error) {
    console.error(error);
  }
});


window.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch(`https://api.thedogapi.com/v1/breeds`);
    const breeds = await response.json();

    console.log(breeds);

    if (breeds && breeds.length > 0) {
      let selectOptions = '<option value="all">All Breeds</option>';
      for (const breed of breeds) {
        const breedName = breed.name;
        selectOptions += `<option value="${breedName}">${breedName}</option>`;
      }

      breedSelect.innerHTML = selectOptions;
    } else {
      breedSelect.innerHTML = '<option value="all">No breeds found</option>';
    }
  } catch (error) {
    console.error(error);
    breedSelect.innerHTML = '<option value="all">Error fetching breeds</option>';
  }
});