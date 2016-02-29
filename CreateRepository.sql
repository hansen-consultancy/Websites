/****** Object:  Schema [Vidyano]    Script Date: 2/29/2016 4:05:19 PM ******/
CREATE SCHEMA [Vidyano]
GO
/****** Object:  Table [Vidyano].[CacheUpdates]    Script Date: 2/29/2016 3:22:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Vidyano].[CacheUpdates](
	[Id] [uniqueidentifier] NOT NULL,
	[Timestamp] [datetimeoffset](7) NOT NULL CONSTRAINT [CacheUpdates_DefaultTimestamp]  DEFAULT (sysdatetimeoffset()),
	[Data] [varbinary](max) NOT NULL,
 CONSTRAINT [PK_CacheUpdates] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF)
)

GO
/****** Object:  Table [Vidyano].[ClientCodeSnippets]    Script Date: 2/29/2016 3:22:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Vidyano].[ClientCodeSnippets](
	[Id] [uniqueidentifier] NOT NULL,
	[Type] [int] NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[Offset] [int] NOT NULL,
	[Data] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_ClientCodeSnippets] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF)
)

GO
/****** Object:  Table [Vidyano].[Feedbacks]    Script Date: 2/29/2016 3:22:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Vidyano].[Feedbacks](
	[Id] [uniqueidentifier] NOT NULL,
	[Type] [nvarchar](100) NOT NULL,
	[Comment] [nvarchar](max) NOT NULL,
	[Screenshot] [varbinary](max) NULL,
	[User] [nvarchar](max) NOT NULL,
	[CreatedOn] [datetimeoffset](7) NOT NULL,
 CONSTRAINT [PK_Feedbacks] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF)
)

GO
/****** Object:  Table [Vidyano].[Logs]    Script Date: 2/29/2016 3:22:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Vidyano].[Logs](
	[Id] [uniqueidentifier] NOT NULL,
	[UserId] [uniqueidentifier] NULL,
	[CreatedOn] [datetimeoffset](7) NOT NULL,
	[Type] [int] NOT NULL,
	[Message] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Vidyano_Logs] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF)
)

GO
/****** Object:  Table [Vidyano].[RegisteredStreams]    Script Date: 2/29/2016 3:22:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Vidyano].[RegisteredStreams](
	[Id] [uniqueidentifier] NOT NULL,
	[Key] [nvarchar](max) NOT NULL,
	[PersistentObjectId] [uniqueidentifier] NOT NULL,
	[ValidUntil] [datetimeoffset](7) NOT NULL,
 CONSTRAINT [PK_RegisteredStreams] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF)
)

GO
/****** Object:  Table [Vidyano].[Settings]    Script Date: 2/29/2016 3:22:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Vidyano].[Settings](
	[Id] [uniqueidentifier] NOT NULL,
	[Key] [nvarchar](max) NOT NULL,
	[Value] [nvarchar](max) NULL,
	[IsSystem] [bit] NOT NULL,
 CONSTRAINT [PK_Settings] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF)
)

GO
/****** Object:  Table [Vidyano].[UserGroup]    Script Date: 2/29/2016 3:22:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Vidyano].[UserGroup](
	[Users_Id] [uniqueidentifier] NOT NULL,
	[Groups_Id] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_UserGroup] PRIMARY KEY CLUSTERED 
(
	[Users_Id] ASC,
	[Groups_Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF)
)

GO
/****** Object:  Table [Vidyano].[Users]    Script Date: 2/29/2016 3:22:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Vidyano].[Users](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[FriendlyName] [nvarchar](max) NULL,
	[PasswordHash] [varchar](max) NOT NULL,
	[IsSystem] [bit] NOT NULL,
	[Language] [nvarchar](max) NULL,
	[CultureInfo] [varchar](100) NULL,
	[Settings] [nvarchar](max) NULL,
	[Version] [int] NOT NULL,
	[CreationDate] [datetimeoffset](7) NOT NULL,
	[LastLoginDate] [datetimeoffset](7) NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF)
)

GO
/****** Object:  Table [Vidyano].[Users_Group]    Script Date: 2/29/2016 3:22:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Vidyano].[Users_Group](
	[Id] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_Users_Group] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF)
)

GO
INSERT [Vidyano].[Settings] ([Id], [Key], [Value], [IsSystem]) VALUES (N'a87d4fff-dfca-4c23-9f2f-00c6ad98c115', N'ClientSecurityData', N'{"Vidyano":{"isEnabled":true}}', 1)
GO
INSERT [Vidyano].[Settings] ([Id], [Key], [Value], [IsSystem]) VALUES (N'a635694b-9ae0-48ad-8639-0e94d55dc505', N'Web Accent Color', N'#0c5d7d', 1)
GO
INSERT [Vidyano].[Settings] ([Id], [Key], [Value], [IsSystem]) VALUES (N'121d94b3-e1fe-41f2-b6af-2e3657a11724', N'AnalyticsKey', NULL, 1)
GO
INSERT [Vidyano].[Settings] ([Id], [Key], [Value], [IsSystem]) VALUES (N'98170ea4-df29-4fb2-bf07-4719b8e78730', N'Password Minimum Length', N'8', 1)
GO
INSERT [Vidyano].[Settings] ([Id], [Key], [Value], [IsSystem]) VALUES (N'b3eb1978-0634-4402-92d0-4cd416c173c2', N'Password Complexity', N'Lowercase, Uppercase, Digit', 1)
GO
INSERT [Vidyano].[Settings] ([Id], [Key], [Value], [IsSystem]) VALUES (N'827ea51c-643e-4a76-856a-618776f72019', N'Log Retention', N'30', 1)
GO
INSERT [Vidyano].[Settings] ([Id], [Key], [Value], [IsSystem]) VALUES (N'3b03a61a-b2f5-4a59-a1fb-639fbc731516', N'FeedbackNotificationEmailTo', NULL, 1)
GO
INSERT [Vidyano].[Settings] ([Id], [Key], [Value], [IsSystem]) VALUES (N'5d7f02cb-3f52-4382-b540-65fa81e42517', N'UseDirtyReads', N'False', 1)
GO
INSERT [Vidyano].[Settings] ([Id], [Key], [Value], [IsSystem]) VALUES (N'8d080d7d-b94c-442c-a54c-7528f4753dc1', N'Default TimeZone', N'', 1)
GO
INSERT [Vidyano].[Settings] ([Id], [Key], [Value], [IsSystem]) VALUES (N'0ba1ec79-ec3b-4217-95cf-7642799bdba1', N'SynchronizeSchema', N'Always', 1)
GO
INSERT [Vidyano].[Settings] ([Id], [Key], [Value], [IsSystem]) VALUES (N'24edfdf1-106c-4f48-882b-7960be285e72', N'Default Text FilterOperation', N'StartsWith', 1)
GO
INSERT [Vidyano].[Settings] ([Id], [Key], [Value], [IsSystem]) VALUES (N'0d6b0db4-fcad-408e-858d-7cc7c60c3906', N'ContactEmailPassphrase', N'', 0)
GO
INSERT [Vidyano].[Settings] ([Id], [Key], [Value], [IsSystem]) VALUES (N'a0ef6c49-c08d-417a-8b2d-8a515029a20c', N'Default Language', N'en', 1)
GO
INSERT [Vidyano].[Settings] ([Id], [Key], [Value], [IsSystem]) VALUES (N'e7c75da2-3746-49a1-ad56-8c29fffb3b58', N'ApplicationLicenseToken', N'', 1)
GO
INSERT [Vidyano].[Settings] ([Id], [Key], [Value], [IsSystem]) VALUES (N'a32c5725-a13c-4a7f-9694-94ace0d7cd4f', N'PerformanceToken', N'', 1)
GO
INSERT [Vidyano].[Settings] ([Id], [Key], [Value], [IsSystem]) VALUES (N'8978e4f8-688a-44f4-a8f5-9d7b4bf50ded', N'Session Persistent Object', NULL, 1)
GO
INSERT [Vidyano].[Settings] ([Id], [Key], [Value], [IsSystem]) VALUES (N'356ed984-dd81-44e2-ab64-afc79c287a6e', N'SmtpConfiguration', N'', 1)
GO
INSERT [Vidyano].[Settings] ([Id], [Key], [Value], [IsSystem]) VALUES (N'0482815f-ce40-4cf1-8682-b201bccd8f0b', N'FeedbackNotificationEmailFrom', NULL, 1)
GO
INSERT [Vidyano].[Settings] ([Id], [Key], [Value], [IsSystem]) VALUES (N'dcceec5f-5968-4f7a-8c4b-b45785699eb2', N'RepositoryVersion', N'56', 1)
GO
INSERT [Vidyano].[Settings] ([Id], [Key], [Value], [IsSystem]) VALUES (N'62698024-f04c-4c6a-a7d9-c379b12c7905', N'ServiceVersion', N'5.1.33103.3769', 1)
GO
INSERT [Vidyano].[Settings] ([Id], [Key], [Value], [IsSystem]) VALUES (N'aa1de64d-2a80-47f6-9351-d7dd2856d2cd', N'Default QueryLayoutMode', N'FullPage', 1)
GO
INSERT [Vidyano].[Settings] ([Id], [Key], [Value], [IsSystem]) VALUES (N'53f4f2fb-9390-495d-9730-e0190517a863', N'License', N'', 1)
GO
INSERT [Vidyano].[Settings] ([Id], [Key], [Value], [IsSystem]) VALUES (N'68a6bc9f-276b-4d9e-b7f4-e298649cca65', N'SynchronizeBlacklist', N'', 1)
GO
INSERT [Vidyano].[Settings] ([Id], [Key], [Value], [IsSystem]) VALUES (N'a24d3622-9e03-4763-bfdc-ee0562788f47', N'MicrosoftTranslatorAppId', NULL, 1)
GO
INSERT [Vidyano].[Settings] ([Id], [Key], [Value], [IsSystem]) VALUES (N'85a76cfb-12c2-442f-8f7e-f9e0cfc4818e', N'AllowAutomaticRepositoryUpgrades', N'True', 1)
GO
INSERT [Vidyano].[Settings] ([Id], [Key], [Value], [IsSystem]) VALUES (N'2ab7f9f3-9a0b-44e6-9bd5-fd0519e625a5', N'Default PageSize', N'', 1)
GO
INSERT [Vidyano].[UserGroup] ([Users_Id], [Groups_Id]) VALUES (N'33580331-2794-421d-a85c-aa7532d671f1', N'fe9429ba-d5cd-4e7c-bbe4-05a4c3497d97')
GO
INSERT [Vidyano].[UserGroup] ([Users_Id], [Groups_Id]) VALUES (N'fe9429ba-d5cd-4e7c-bbe4-05a4c3497d97', N'd3bd3312-0730-43d9-9bf4-9e14c75b00f7')
GO
INSERT [Vidyano].[Users] ([Id], [Name], [FriendlyName], [PasswordHash], [IsSystem], [Language], [CultureInfo], [Settings], [Version], [CreationDate], [LastLoginDate]) VALUES (N'fe9429ba-d5cd-4e7c-bbe4-05a4c3497d97', N'Administrators', NULL, N'', 1, NULL, NULL, NULL, 0, CAST(N'2016-02-26T10:22:26.2644463+01:00' AS DateTimeOffset), NULL)
GO
INSERT [Vidyano].[Users] ([Id], [Name], [FriendlyName], [PasswordHash], [IsSystem], [Language], [CultureInfo], [Settings], [Version], [CreationDate], [LastLoginDate]) VALUES (N'7361d619-19c3-42f3-b860-730aa4cfcd1b', N'Websites', NULL, N'', 0, NULL, NULL, NULL, 0, CAST(N'2016-02-26T10:40:06.4005856+01:00' AS DateTimeOffset), NULL)
GO
INSERT [Vidyano].[Users] ([Id], [Name], [FriendlyName], [PasswordHash], [IsSystem], [Language], [CultureInfo], [Settings], [Version], [CreationDate], [LastLoginDate]) VALUES (N'd3bd3312-0730-43d9-9bf4-9e14c75b00f7', N'Users', NULL, N'', 1, NULL, NULL, NULL, 0, CAST(N'2016-02-26T10:22:26.2644463+01:00' AS DateTimeOffset), NULL)
GO
INSERT [Vidyano].[Users] ([Id], [Name], [FriendlyName], [PasswordHash], [IsSystem], [Language], [CultureInfo], [Settings], [Version], [CreationDate], [LastLoginDate]) VALUES (N'33580331-2794-421d-a85c-aa7532d671f1', N'Admin', NULL, N'$2a$12$qE5JcWeMegAtJpy6vOtJ.O5PunH43xk9jLkLtIkPH.ZIqkv0h4n7K', 0, NULL, NULL, NULL, 0, CAST(N'2016-02-26T10:22:26.2644463+01:00' AS DateTimeOffset), CAST(N'2016-02-29T11:00:47.7283281+01:00' AS DateTimeOffset))
GO
INSERT [Vidyano].[Users_Group] ([Id]) VALUES (N'fe9429ba-d5cd-4e7c-bbe4-05a4c3497d97')
GO
INSERT [Vidyano].[Users_Group] ([Id]) VALUES (N'7361d619-19c3-42f3-b860-730aa4cfcd1b')
GO
INSERT [Vidyano].[Users_Group] ([Id]) VALUES (N'd3bd3312-0730-43d9-9bf4-9e14c75b00f7')
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [UQ_Users_Name]    Script Date: 2/29/2016 3:22:54 PM ******/
ALTER TABLE [Vidyano].[Users] ADD  CONSTRAINT [UQ_Users_Name] UNIQUE NONCLUSTERED 
(
	[Name] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF)
GO
ALTER TABLE [Vidyano].[Logs]  WITH CHECK ADD  CONSTRAINT [FK_Logs_Users] FOREIGN KEY([UserId])
REFERENCES [Vidyano].[Users] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [Vidyano].[Logs] CHECK CONSTRAINT [FK_Logs_Users]
GO
ALTER TABLE [Vidyano].[UserGroup]  WITH CHECK ADD  CONSTRAINT [FK_UserGroup_Group] FOREIGN KEY([Groups_Id])
REFERENCES [Vidyano].[Users_Group] ([Id])
GO
ALTER TABLE [Vidyano].[UserGroup] CHECK CONSTRAINT [FK_UserGroup_Group]
GO
ALTER TABLE [Vidyano].[UserGroup]  WITH CHECK ADD  CONSTRAINT [FK_UserGroup_User] FOREIGN KEY([Users_Id])
REFERENCES [Vidyano].[Users] ([Id])
GO
ALTER TABLE [Vidyano].[UserGroup] CHECK CONSTRAINT [FK_UserGroup_User]
GO
ALTER TABLE [Vidyano].[Users_Group]  WITH CHECK ADD  CONSTRAINT [FK_Group_inherits_User] FOREIGN KEY([Id])
REFERENCES [Vidyano].[Users] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [Vidyano].[Users_Group] CHECK CONSTRAINT [FK_Group_inherits_User]
GO
