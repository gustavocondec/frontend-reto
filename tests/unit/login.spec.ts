import {mount} from '@vue/test-utils'
import Login from "@/views/Auth/Login.vue";
import {Quasar} from "quasar";

const wrapperFactory = ()=> {
  let mouted = mount(Login,{
    global: {
      plugins: [Quasar]
    }
  })
  return mouted
}

describe('Login.vue', ()=>{
  test('Should be rendered', ()=>{
    const wrapper = mount(Login)
    let text = wrapper.text().toLowerCase()
    console.log('text', text)
    expect(text).toContain('iniciar sesion')
  })
  test('Must be login with username and password',async ()=>{

    const wrapper = wrapperFactory()

    let inputUsername = wrapper.find('[data-test=username]')
    let inputPassword = wrapper.find('[data-test=password]')
    let buttonSubmit= wrapper.find('[data-test=button]')

    await inputUsername.setValue('sarah')
    await inputPassword.setValue('connor')

    expect(inputUsername).toBeDefined()
    expect(inputPassword).toBeDefined()
    expect(buttonSubmit).toBeDefined()

  })
})
