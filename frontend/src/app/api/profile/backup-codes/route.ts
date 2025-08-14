import {NextResponse} from 'next/server';

export async function GET() {
    return NextResponse.json({codes: ['CODE1', 'CODE2', 'CODE3', 'CODE4', 'CODE5']});
}
