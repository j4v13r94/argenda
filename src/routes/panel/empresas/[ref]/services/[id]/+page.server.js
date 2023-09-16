import { prisma } from '../../../../../../lib/server/db'
import { fail, redirect } from '@sveltejs/kit';
import { parseObject } from '../../../../../../lib/utils/parse';



/** @type {import('./$types').PageLoad} */
export async function load(event) {


	const session = await event.locals.getSession()




	const { ref, id } = event.params

	try {

		const empresa = await prisma.empresa.findUnique({ where: { ref, userId: +session.user.id } })

		if (!empresa)
			throw Error('')

		const service = await prisma.services.findUnique({ where: { sref: id, empresaId: empresa.id } })


		if (service)
			return { service }

		return { service: { empresaId: empresa.id } }



	} catch (error) {
		throw redirect(302, '/panel/empresas')
	}

	// try {


	// 	if (!ref)
	// 		throw Error('')

	// 	if (!session)
	// 		throw Error('')

	// 	const empresa = await  prisma.services.findUnique({  })
	// 	empresa.horarios = JSON.parse(empresa.horarios)
	// 	return { empresa }
	// } catch (error) {
	// 	return { empresas: null }
	// }


}


/** @type {import('./$types').Actions} */
export const actions = {
	Service: async ({ request }) => {


		const obj = Object.fromEntries(await request.formData())

		parseObject(obj)

		const { sref, ...campos } = obj

		let service = await prisma.services.findUnique({ where: { sref } })


		if (!service) {
			//crear 

			const newservice = await prisma.services.create({ data: { ...campos } })
			if (newservice)
				return { success: true, sref: newservice.sref }
		}
		// actualizar 
		const update = await prisma.services.update({ where: { sref: service.sref }, data: { ...campos } })
		if (update)
			return { sref: update.sref }
		return fail(304, 'error')
	}
};



