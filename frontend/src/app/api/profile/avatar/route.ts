import {NextResponse} from 'next/server';

export async function POST(request: Request) {
    const form = await request.formData();
    const file = form.get('avatar') as File | null;
    const url = file ? `/uploads/${file.name}` : '';
    return NextResponse.json({url});
}
