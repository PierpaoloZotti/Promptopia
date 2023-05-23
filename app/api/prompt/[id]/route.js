import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET to READ
export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate('creator')
        if (!prompt) return new Response("Prompt não encontrado", { status: 404 })

        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}

// PATCH to UPDATE
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt) return new Response("Prompt não encontrado", { status: 404 });
        console.log(existingPrompt)
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), { status: 200 });

    } catch (error) {
        return new Response("Error: " + error.message, { status: 500 });
    }
}

// DELETE to DELETE

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB()

        await Prompt.findByIdAndRemove(params.id)

        return new Response("Prompt excluido com successo", { status: 200 })
    } catch (error) {
        return new Response("A exclusão do prompt não foi bem sucedida", { status: 500 })
    }
}

