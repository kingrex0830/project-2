const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Grades extends Model {}

Grades.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: 3,
      },
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'student',
        key: 'id',
      },
      onDelete: 'CASCADE', 
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'course',
        key: 'id',
      },
      onDelete: 'CASCADE', 
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'grades',
  }
);

module.exports = Grades;
