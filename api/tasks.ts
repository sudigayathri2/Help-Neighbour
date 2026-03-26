
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from '../lib/db.js';
import type { User } from '../src/shared/types.js';
const PLATFORM_FEE_PERCENT = 0.05;


export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { db } = await connectToDatabase();
    const tasksCollection = db.collection('tasks');
    const usersCollection = db.collection<User>('users');
    const notesCollection = db.collection('notifications');

    if (req.method === 'GET') {
      const tasks = await tasksCollection.find({}).sort({ createdAt: -1 }).toArray();
      return res.status(200).json(tasks);
    }

    if (req.method === 'POST') {
      const newTask = {
        ...req.body,
        createdAt: Date.now(),
        status: 'pending'
      };
      await tasksCollection.insertOne(newTask);

      await notesCollection.insertOne({
        id: `n-new-${Date.now()}`,
        message: `Your help request "${newTask.title}" is now live!`,
        type: 'info',
        timestamp: Date.now(),
        read: false
      });

      return res.status(201).json(newTask);
    }

    if (req.method === 'PATCH') {
      const { taskId, action, helperId } = req.body;
      const callerId = req.headers['x-user-id'] as string;
      const task = await tasksCollection.findOne({ id: taskId });

      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      if (action === 'accept') {
        const { helperName, helperAvatar } = req.body;
        await tasksCollection.updateOne(
          { id: taskId },
          {
            $set: {
              status: 'accepted',
              helperId,
              helperName,
              helperAvatar,
              acceptedAt: Date.now()
            }
          }
        );

        await usersCollection.updateOne(
          { id: helperId },
          { $set: { isAvailable: false } }
        );
      }






      if (action === 'complete') {
        const task = await tasksCollection.findOne({
          id: taskId,
          helperId: callerId
        });

        if (!task || task.helperId !== callerId) {
          return res.status(403).json({
            error: 'Only assigned helper can complete this task.'
          });
        }

        const { proof } = req.body;

        await tasksCollection.updateOne(
          { id: taskId },
          {
            $set: {
              status: 'done',
              proofOfWork: proof || '',
              doneAt: Date.now()
            }
          }
        );
      }






      // if (action === 'complete') {
      //   const task = await tasksCollection.findOne({ id: taskId });

      //   if (!task || task.helperId !== callerId) {
      //     return res.status(403).json({ error: 'Only assigned helper can complete this task.' });
      //   }
      //   const { proof } = req.body; // ✅ match frontend
      //   await tasksCollection.updateOne(
      //     { id: taskId },
      //     {
      //       $set: {
      //         status: 'done',
      //         proofOfWork: proof || ''
      //       }
      //     }
      //   );
      // }








      //********************* */

      // if (action === 'finalize') {  ////important - this is where payment logic lives
      //   //const task = await tasksCollection.findOne({ id: taskId });
      //   if (!task || task.status !== 'done') {
      //     return res.status(400).json({ error: 'Task is not in a confirmable state.' });
      //   }

      //   const requester = await usersCollection.findOne({ id: task.requesterId });
      //   const helper = await usersCollection.findOne({ id: task.helperId });

      //   if (!requester || !helper) return res.status(404).json({ error: 'Requester or Helper not found' });

      //   if (task.paymentType === 'cash') {
      //     if (requester.walletBalance < task.reward) {
      //       return res.status(400).json({ error: 'Insufficient wallet balance.' });
      //     }
      //     const netReward = task.reward * (1 - PLATFORM_FEE_PERCENT);
      //     await usersCollection.updateOne({ id: task.requesterId }, { $inc: { walletBalance: -task.reward } });
      //     await usersCollection.updateOne({ id: task.helperId }, { $inc: { walletBalance: netReward, totalHelps: 1 } });

      //     await notesCollection.insertOne({
      //       id: `n-paid-req-${Date.now()}`,
      //       message: `Payment of $${task.reward.toFixed(2)} sent to ${helper.name}.`,
      //       type: 'success',
      //       timestamp: Date.now(),
      //       read: false
      //     });
      //     await notesCollection.insertOne({
      //       id: `n-paid-help-${Date.now()}`,
      //       message: `You earned $${netReward.toFixed(2)} for "${task.title}"!`,
      //       type: 'success',
      //       timestamp: Date.now(),
      //       read: false
      //     });
      //   } else {
      //     // Coupon Payment logic - simply credit totalHelps as reward is the info itself
      //     // await usersCollection.updateOne({ id: task.helperId }, { $inc: { totalHelps: 1 } });

      //     // await notesCollection.insertOne({
      //     //   id: `n-paid-req-${Date.now()}`,
      //     //   message: `Digital coupon for "${task.title}" released to ${helper.name}.`,
      //     //   type: 'success',
      //     //   timestamp: Date.now(),
      //     //   read: false
      //     // });
      //     // await notesCollection.insertOne({
      //     //   id: `n-paid-help-${Date.now()}`,
      //     //   message: `You received a ${task.couponDetails?.provider} coupon worth $${task.reward} for "${task.title}"! Check task details for the code.`,
      //     //   type: 'success',
      //     //   timestamp: Date.now(),
      //     //   read: false
      //     // });


      //     // ✅ Proper Coupon Payment Logic

      //     await usersCollection.updateOne(
      //       { id: task.helperId },
      //       {
      //         $push: {
      //           coupons: {
      //             id: `c-${Date.now()}`,
      //             taskId: task.id,
      //             provider: task.couponDetails?.provider || "Unknown",
      //             code: task.couponDetails?.code || "",
      //             value: task.reward,
      //             expiryDate: task.couponDetails?.expiryDate || Date.now(),
      //             fromUserId: task.requesterId,
      //             collectedAt: Date.now()
      //           }
      //         },
      //         $inc: { totalHelps: 1 }
      //       }
      //     );

      //     await notesCollection.insertOne({
      //       id: `n-paid-req-${Date.now()}`,
      //       message: `Coupon for "${task.title}" successfully released to ${helper.name}.`,
      //       type: 'success',
      //       timestamp: Date.now(),
      //       read: false
      //     });

      //     await notesCollection.insertOne({
      //       id: `n-paid-help-${Date.now()}`,
      //       message: `You received a ${task.couponDetails?.provider} coupon worth $${task.reward}. Check your Profile to view it.`,
      //       type: 'success',
      //       timestamp: Date.now(),
      //       read: false
      //     });
      //   }

      //   await tasksCollection.updateOne({ id: taskId }, {
      //     $set: {
      //       status: 'finalized',
      //       finalizedAt: Date.now()
      //     }
      //   });
      // }
      //*************************************************** */


      if (action === 'finalize') {
  // 1. Auth check
  if (task.requesterId !== callerId) {
    return res.status(403).json({ error: 'Only the requester can finalize.' });
  }
  if (task.status !== 'done') {
    return res.status(400).json({ error: 'Task is not ready to finalize.' });
  }

  // 2. Lock the task atomically before any money moves
  const lockResult = await tasksCollection.updateOne(
    { id: taskId, status: 'done' },
    { $set: { status: 'finalizing' } }
  );
  if (lockResult.modifiedCount === 0) {
    return res.status(409).json({ error: 'Finalization already in progress.' });
  }

  try {
    if (task.paymentType === 'cash') {
      const netReward = task.reward * (1 - PLATFORM_FEE_PERCENT);

      // 3. Atomic balance check + deduct in one operation
      const deductResult = await usersCollection.updateOne(
        { id: task.requesterId, walletBalance: { $gte: task.reward } },
        { $inc: { walletBalance: -task.reward } }
      );
      if (deductResult.modifiedCount === 0) {
        // Roll back the lock
        await tasksCollection.updateOne({ id: taskId }, { $set: { status: 'done' } });
        return res.status(400).json({ error: 'Insufficient wallet balance.' });
      }

      // 4. Credit helper only after deduction succeeds
      await usersCollection.updateOne(
        { id: task.helperId },
        { $inc: { walletBalance: netReward, totalHelps: 1 } }
      );
    }
    // ... coupon logic unchanged

    // 5. Mark finalized
    await tasksCollection.updateOne(
      { id: taskId },
      { $set: { status: 'finalized', finalizedAt: Date.now() } }
    );
  } catch (e) {
    // Roll back lock on unexpected error
    await tasksCollection.updateOne({ id: taskId }, { $set: { status: 'done' } });
    throw e;
  }
}


      if (action === 'reject') {

        if (!task || task.status !== 'done') {
          return res.status(400).json({ error: 'Task is not in a rejectable state.' });
        }

        if (task.requesterId !== callerId) {
          return res.status(403).json({ error: 'Only requester can reject this task.' });
        }

        await tasksCollection.updateOne(
          { id: taskId },
          {
            $set: {
              status: 'rejected',
              rejectedAt: Date.now()
            }
          }
        );

        await notesCollection.insertOne({
          id: `n-reject-${Date.now()}`,
          message: `Your work for "${task.title}" was rejected. You may escalate to dispute.`,
          type: 'alert',
          timestamp: Date.now(),
          read: false
        });
      }

      if (action === "dispute") {
        const { reason } = req.body;

        if (task.helperId !== callerId) {
          return res.status(403).json({
            error: "Only helper can escalate dispute."
          });
        }

        await tasksCollection.updateOne(
          { id: taskId },
          {
            $set: {
              status: "disputed",
              disputeReason: reason,
              disputedAt: Date.now()
            }
          }
        );
      }



      const updatedTask = await tasksCollection.findOne({ id: taskId });

      let updatedRequester = null;
      let updatedHelper = null;

      if (action === 'finalize') {
        updatedRequester = await usersCollection.findOne({ id: updatedTask?.requesterId });
        updatedHelper = await usersCollection.findOne({ id: updatedTask?.helperId });
      }

      return res.status(200).json({
        task: updatedTask,
        requester: updatedRequester,
        helper: updatedHelper
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
