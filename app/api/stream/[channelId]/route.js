import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  const { channelId } = params

  if (!channelId) {
    return NextResponse.json({ error: 'Channel ID is required' }, { status: 400 })
  }

  try {
    const response = await fetch(`https://radio.garden/api/ara/content/listen/${channelId}/channel.mp3`, {
      redirect: 'manual',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })

    if (response.status === 302) {
      const location = response.headers.get('location')
      return NextResponse.json({ streamUrl: location })
    } else {
      throw new Error('Unexpected response from Radio Garden')
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}