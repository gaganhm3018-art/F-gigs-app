// backend/src/__tests__/user.test.ts
import request from 'supertest';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('User API', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('POST /api/v1/users', () => {
    it('should create a new user', async () => {
      const userData = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1234567890'
      };

      const user = await prisma.user.create({
        data: userData
      });

      expect(user).toHaveProperty('id');
      expect(user.email).toBe(userData.email);
    });

    it('should throw error for duplicate email', async () => {
      const userData = {
        email: 'duplicate@example.com',
        firstName: 'Jane',
        lastName: 'Doe'
      };

      await prisma.user.create({ data: userData });

      expect(async () => {
        await prisma.user.create({ data: userData });
      }).rejects.toThrow();
    });
  });

  describe('GET /api/v1/users/:id', () => {
    it('should retrieve user by id', async () => {
      const user = await prisma.user.create({
        data: {
          email: 'getuser@example.com',
          firstName: 'Get',
          lastName: 'User'
        }
      });

      const retrievedUser = await prisma.user.findUnique({
        where: { id: user.id }
      });

      expect(retrievedUser?.email).toBe(user.email);
    });

    it('should return null for non-existent user', async () => {
      const user = await prisma.user.findUnique({
        where: { id: 'non-existent-id' }
      });

      expect(user).toBeNull();
    });
  });

  describe('PUT /api/v1/users/:id', () => {
    it('should update user information', async () => {
      const user = await prisma.user.create({
        data: {
          email: 'updateuser@example.com',
          firstName: 'Old',
          lastName: 'Name'
        }
      });

      const updated = await prisma.user.update({
        where: { id: user.id },
        data: {
          firstName: 'New',
          lastName: 'UpdatedName'
        }
      });

      expect(updated.firstName).toBe('New');
      expect(updated.lastName).toBe('UpdatedName');
    });
  });

  describe('DELETE /api/v1/users/:id', () => {
    it('should delete a user', async () => {
      const user = await prisma.user.create({
        data: {
          email: 'deleteuser@example.com',
          firstName: 'Delete',
          lastName: 'Me'
        }
      });

      await prisma.user.delete({
        where: { id: user.id }
      });

      const deletedUser = await prisma.user.findUnique({
        where: { id: user.id }
      });

      expect(deletedUser).toBeNull();
    });
  });
});
