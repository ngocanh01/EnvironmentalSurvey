using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Project_Api_EnvironmentalSurveys.Models;

public partial class DatabaseContext : DbContext
{
    public DatabaseContext()
    {
    }

    public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Answer> Answers { get; set; }

    public virtual DbSet<Question> Questions { get; set; }

    public virtual DbSet<QuestionOption> QuestionOptions { get; set; }

    public virtual DbSet<QuestionType> QuestionTypes { get; set; }

    public virtual DbSet<Response> Responses { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Survey> Surveys { get; set; }

    public virtual DbSet<SurveyCategory> SurveyCategories { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=TONY\\SQLEXPRESS;Database=EnvirontmentalSurveys;user id=sa;password=12345678;trusted_connection=true;encrypt=false");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Answer>(entity =>
        {
            entity.ToTable("Answer");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Answer1)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("answer");
            entity.Property(e => e.Question)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("question");
            entity.Property(e => e.ResponseId).HasColumnName("responseId");

            entity.HasOne(d => d.Response).WithMany(p => p.Answers)
                .HasForeignKey(d => d.ResponseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Answer_Response");
        });

        modelBuilder.Entity<Question>(entity =>
        {
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.IsMandatory).HasColumnName("isMandatory");
            entity.Property(e => e.QuestionText)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("questionText");
            entity.Property(e => e.QuestionTypeId).HasColumnName("questionTypeId");
            entity.Property(e => e.SurveyId).HasColumnName("surveyId");

            entity.HasOne(d => d.QuestionType).WithMany(p => p.Questions)
                .HasForeignKey(d => d.QuestionTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Questions_QuestionType");

            entity.HasOne(d => d.Survey).WithMany(p => p.Questions)
                .HasForeignKey(d => d.SurveyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Questions_Surveys");
        });

        modelBuilder.Entity<QuestionOption>(entity =>
        {
            entity.ToTable("QuestionOption");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.QuestionId).HasColumnName("questionId");
            entity.Property(e => e.Score).HasColumnName("score");
            entity.Property(e => e.Value)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("value");

            entity.HasOne(d => d.Question).WithMany(p => p.QuestionOptions)
                .HasForeignKey(d => d.QuestionId)
                .HasConstraintName("FK_QuestionOption_Questions");
        });

        modelBuilder.Entity<QuestionType>(entity =>
        {
            entity.ToTable("QuestionType");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Response>(entity =>
        {
            entity.ToTable("Response");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Created)
                .HasColumnType("date")
                .HasColumnName("created");
            entity.Property(e => e.Score).HasColumnName("score");
            entity.Property(e => e.SurveyId).HasColumnName("surveyId");
            entity.Property(e => e.UserId).HasColumnName("userId");

            entity.HasOne(d => d.Survey).WithMany(p => p.Responses)
                .HasForeignKey(d => d.SurveyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Response_Surveys");

            entity.HasOne(d => d.User).WithMany(p => p.Responses)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Response_Users");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Survey>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Survey");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Description)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("description");
            entity.Property(e => e.EndDate)
                .HasColumnType("date")
                .HasColumnName("endDate");
            entity.Property(e => e.StartDate)
                .HasColumnType("date")
                .HasColumnName("startDate");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.SurveyCategoryId).HasColumnName("surveyCategoryId");
            entity.Property(e => e.Title)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("title");
            entity.Property(e => e.Type)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("type");

            entity.HasOne(d => d.SurveyCategory).WithMany(p => p.Surveys)
                .HasForeignKey(d => d.SurveyCategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Surveys_SurveyCategory");
        });

        modelBuilder.Entity<SurveyCategory>(entity =>
        {
            entity.ToTable("SurveyCategory");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("name");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Email)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Name)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.Password)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.Username)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("username");

            entity.HasMany(d => d.Roles).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "UserRole",
                    r => r.HasOne<Role>().WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK_UserRole_Roles"),
                    l => l.HasOne<User>().WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK_UserRole_Users"),
                    j =>
                    {
                        j.HasKey("UserId", "RoleId");
                        j.ToTable("UserRole");
                        j.IndexerProperty<int>("UserId").HasColumnName("userId");
                        j.IndexerProperty<int>("RoleId").HasColumnName("roleId");
                    });
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
