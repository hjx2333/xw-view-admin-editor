// import { shallowMount } from '@vue/test-utils'
// import HelloWorld from '@/components/HelloWorld.vue'

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg }
//     })
//     expect(wrapper.text()).toMatch(msg)
//   })
// })

import { deepCopy } from '../../src/utils/utils'

describe('公共函数测试，utils', () => {
    it('深拷贝，deepCopy', () => {
        const obj = {
            a: 1,
            b: [1, 2, 3],
            c: {
                a: 1,
                b: 2
            }
        }

        const obj2 = deepCopy(obj)
        expect(obj2.b).not.toBe(obj.b)
    })
})