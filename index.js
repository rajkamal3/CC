var state = {
    sort: 'default',
    sortBy: 'date',
    displayRange: [0, 10],
    currentSelection: null,
    data: null,
    renderedHTML: null,
    loadMore: function () {
        this.displayRange[0] = this.displayRange[0] + 10;
        this.displayRange[1] = this.displayRange[1] + 10;
        this.init();
    },
    renderer: (res) => {
        return `
            <div style='border: 3px solid lightgrey'>
                <h4>${res.id}</h4>
                <p>${res.body}</p>
            </div>
        `;
    },
    init: function () {
        document.querySelector('.modal').style.opacity = '1';
        axios
            .get(
                `https://jsonplaceholder.typicode.com/posts?_start=${this.displayRange[0]}&_end=${this.displayRange[1]}`
            )
            .then((res) => {
                this.data = res.data;
                for (var i = 0; i < this.data.length; i++) {
                    this.renderedHTML = this.renderer(this.data[i]);
                    document.querySelector(
                        '.fillThis'
                    ).innerHTML += this.renderedHTML;
                }
                document.querySelector('.modal').style.opacity = '0';
            });
    }
};

function callInit() {
    state.init();
}

function loadMore() {
    state.loadMore();
    console.log(state);
}

// document.querySelector('#selectId').addEventListener('change', (e) => {
//     e.preventDefault();
//     this.currentSelection = e.target.value;

//     // this.loading = false;

//     // for (var i = 0; i < this.data.length; i++) {
//     //   this.renderedHTML = this.renderer(this.data[i]);
//     //   document.querySelector('.fillThis').innerHTML += this.renderedHTML;
//     // }

//     console.log(this);
// });
