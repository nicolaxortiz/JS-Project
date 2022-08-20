const API = "https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes";

const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'cfad89f264msh52832008c2f94cap168055jsnb6ca3d1d74d1',
		'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
	}
};

async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}

(async () => {
    try{
        const pizzas = await fetchData(API);
        let view = `
        ${pizzas.results.map(pizza => `
            <div class="group relative">
                <div
                class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${pizza.thumbnail_url}" alt="${pizza.seo_title}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        ${pizza.name}
                    </h3>
                </div>
            </div>
        `).slice(0,4).join('')}
            
        `;

        content.innerHTML = view;
    }catch (error){
        let viewError = `
            <div class="group relative">
                <div
                class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <h2>Error Gravisimo: ${error}</h2>
                </div>
            </div>
        `;

        content.innerHTML = viewError;
    }
})();