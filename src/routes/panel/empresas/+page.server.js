/** @type {import('./$types').PageLoad} */

import { prisma } from '../../../lib/server/db';


export async function load(event) {


    const session = await event.locals.getSession()


    try {

        if (!session)
            throw Error('')

        const empresas = await prisma.empresa.findMany({ where: { userId: session.user.id } }) || []

        return { empresas }
    } catch (error) {
        return { empresas: [] }
    }


}