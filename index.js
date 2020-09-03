var state = {
    sort: ['asc', 'desc'],
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
    dropdownSelection: function () {
        document.querySelector('#selectId').addEventListener('change', (e) => {
            e.preventDefault();
            this.currentSelection = e.target.value;

            for (var i = 0; i < this.data.length; i++) {
                this.renderedHTML = this.renderer(this.data[i]);
                document.querySelector('.fillThis').innerHTML += this.renderedHTML;
            }
        });
    },
    sortMethod: function () {
        var sortOrder = document.querySelector('.sort').getAttribute('data-order');

        if (sortOrder === 'asc') {
            document.querySelector('.sort').setAttribute('data-order', 'desc');
            document.querySelector('.sort').innerHTML = 'Sort - Descending';
        } else if (sortOrder === 'desc') {
            document.querySelector('.sort').setAttribute('data-order', 'asc');
            document.querySelector('.sort').innerHTML = 'Sort - Ascending';
        }

        document.querySelector('.modal').style.display = 'block';
        axios.get(`https://jsonplaceholder.typicode.com/posts?_sort=id&_order=${sortOrder}`).then((res) => {
            document.querySelector('.fillThis').innerHTML = '';
            this.data = null;
            this.renderedHTML = null;
            this.data = res.data;
            for (var i = 0; i < this.data.length; i++) {
                this.renderedHTML = this.renderer(this.data[i]);
                document.querySelector('.fillThis').innerHTML += this.renderedHTML;
            }
            document.querySelector('.modal').style.display = 'none';
        });
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
        document.querySelector('.modal').style.display = 'block';
        axios
            .get(
                `https://jsonplaceholder.typicode.com/posts?_start=${this.displayRange[0]}&_end=${this.displayRange[1]}`
            )
            .then((res) => {
                this.data = res.data;
                for (var i = 0; i < this.data.length; i++) {
                    this.renderedHTML = this.renderer(this.data[i]);
                    document.querySelector('.fillThis').innerHTML += this.renderedHTML;
                }
                document.querySelector('.modal').style.display = 'none';
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

function sort() {
    state.sortMethod();
}
