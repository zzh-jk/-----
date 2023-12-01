// import Layout from '@/layout'
// const tableRouter = {
//     path: '/table',
//     component: Layout,
//     redirect: '/table/complex-table',
//     name: 'Table',
//     meta: {
//         title: '养老服务预约',
//         icon: 'user'
//     },
//     children: [{
//             path: 'dynamic-table',
//             component: () =>
//                 import ('@/views/table/dynamic-table/index'),
//             name: 'DynamicTable',
//             meta: { title: 'Dynamic Table' }
//         },
//         {
//             path: '老年餐厅',
//             component: () =>
//                 import ('@/views/table/drag-table'),
//             name: 'DragTable',
//             meta: { title: '老年餐厅' }
//         },
//         {
//             path: 'inline-edit-table',
//             component: () =>
//                 import ('@/views/table/inline-edit-table'),
//             name: 'InlineEditTable',
//             meta: { title: 'Inline Edit' }
//         },
//         {
//             path: 'complex-table',
//             component: () =>
//                 import ('@/views/table/complex-table'),
//             name: 'ComplexTable',
//             meta: { title: 'Complex Table' }
//         }
//     ]
// }
// export default tableRouter