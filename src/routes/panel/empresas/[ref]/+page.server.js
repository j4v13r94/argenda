/** @type {import('./$types').PageLoad} */

import { fail } from '@sveltejs/kit'
import { prisma } from '../../../../lib/server/db'

import { redirect } from '@sveltejs/kit';

export async function load(event) {


    const session = await event.locals.getSession()
    const { ref } = event.params


    try {

        if (!session)
            throw Error('')

        if (!ref)
            throw Error('0')


        const empresa = await prisma.empresa.findUnique({ where: { ref, userId: session.user.id } })


        if (!empresa)
            throw Error('0')
        empresa.horarios = JSON.parse(empresa.horarios)

        const services = await prisma.empresa.findUnique({ where: { ref, userId: session.user.id } }).services()

        return { empresa, services }

    } catch (error) {

        if (error.message == '0')
            throw redirect(303, '/panel/empresas/crear')
    }


}


/** @type {import('./$types').Actions} */
export const actions = {
    Horarios: async ({ request }) => {

        try {

            const data = await request.formData();
            const { horarios, ref } = Object.fromEntries(data)


            const result = await prisma.empresa.update({ where: { ref }, data: { horarios } })
            if (result) {

                return { success: true };
            }
            throw Error('')
        } catch (error) {
            return fail(304, 'Error')
        }



    },



    Titulos: async ({ request }) => {
        try {
            const data = await request.formData();
            const { ref, ...campos } = Object.fromEntries(data)

            const result = await prisma.empresa.update({ where: { ref }, data: campos })

            if (result) {

                return { success: true };
            }
            throw Error('')
        } catch (error) {

            return fail(304, 'Error')
        }
    },


    Info: async ({ request }) => {

        try {
            const data = await request.formData();
            const { ref, info } = Object.fromEntries(data)


            const result = await prisma.empresa.update({ where: { ref }, data: { info } })

            if (result) {

                return { success: true };
            }
            throw Error('')
        } catch (error) {

            return fail(304, 'Error')
        }
    },


    Contacto: async ({ request }) => {

        try {
            const data = await request.formData();
            const { ref, ...campos } = Object.fromEntries(data)


            const result = await prisma.empresa.update({ where: { ref }, data: { ...campos } })

            if (result) {

                return { success: true };
            }
            throw Error('')
        } catch (error) {

            return fail(304, 'Error')
        }
    }

};