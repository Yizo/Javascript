class GraphAdjMat {
    // 顶点数组
    vertices = []
    // 邻接矩阵
    edges = []
    adjMat = []

    constructor(vertices, edges) {
        this.vertices = []
        this.adjMat = []

        // 添加顶点
        for(const val of vertices) {
            this.addVertex(val)
        }
        // 添加边
        for(const [from, to] of edges) {
            this.addEdge(from, to)
        }

    }

    size() {
        return this.vertices.length
    }

    addVertex(val) {
        const n = this.size()
        // 添加新的顶点
        this.vertices.push(val)
        // 再邻接矩阵中添加一行
        let newRow = []
        for(let i = 0; i < n; i++) {
            newRow.push(0)
        }
        this.adjMat.push(newRow)
    }

    addEdge(from, to) {

    }
}