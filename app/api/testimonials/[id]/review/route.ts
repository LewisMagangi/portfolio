// POST { action: "approve" | "decline" | "undo" } from the Admin › References queue.
import { NextRequest, NextResponse } from 'next/server';

import { verifyAuth } from '@/lib/auth';
import { decideClientReview, type ReviewDecision } from '@/lib/client-reviews';

const ACTIONS: ReviewDecision[] = ['approve', 'decline', 'undo'];

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const action = body?.action as ReviewDecision;
  if (!ACTIONS.includes(action)) {
    return NextResponse.json({ success: false, error: 'Unknown action' }, { status: 400 });
  }

  try {
    const review = await decideClientReview(params.id, action);
    if (!review) {
      return NextResponse.json({ success: false, error: 'Review not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: { id: review.id, status: review.status } });
  } catch (error) {
    console.error('Error deciding review:', error);
    return NextResponse.json({ success: false, error: 'Could not update the review' }, { status: 500 });
  }
}
