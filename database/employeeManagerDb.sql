USE [employeeManagerDb]
GO
/****** Object:  Table [dbo].[departmentTbl]    Script Date: 1/7/2026 11:41:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[departmentTbl](
	[departmentId] [int] IDENTITY(1,1) NOT NULL,
	[departmentName] [varchar](50) NOT NULL,
	[isActive] [bit] NULL,
 CONSTRAINT [PK_departmentTbl] PRIMARY KEY CLUSTERED 
(
	[departmentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[designationTbl]    Script Date: 1/7/2026 11:41:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[designationTbl](
	[designationId] [int] IDENTITY(1,1) NOT NULL,
	[departmentId] [int] NOT NULL,
	[designationName] [varchar](50) NOT NULL,
 CONSTRAINT [PK_designationTbl] PRIMARY KEY CLUSTERED 
(
	[designationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[employeeTbl]    Script Date: 1/7/2026 11:41:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[employeeTbl](
	[employeeId] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
	[contactNo] [varchar](10) NOT NULL,
	[city] [nvarchar](50) NOT NULL,
	[state] [varchar](50) NOT NULL,
	[pincode] [varchar](6) NOT NULL,
	[altContactNo] [varchar](50) NULL,
	[address] [varchar](2000) NOT NULL,
	[designationId] [int] NOT NULL,
	[createDate] [datetime] NULL,
	[modifiedData] [datetime] NULL,
 CONSTRAINT [PK_employeeTbl] PRIMARY KEY CLUSTERED 
(
	[employeeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[designationTbl]  WITH CHECK ADD  CONSTRAINT [FK_designationTbl_departmentTbl] FOREIGN KEY([departmentId])
REFERENCES [dbo].[departmentTbl] ([departmentId])
GO
ALTER TABLE [dbo].[designationTbl] CHECK CONSTRAINT [FK_designationTbl_departmentTbl]
GO
ALTER TABLE [dbo].[employeeTbl]  WITH CHECK ADD  CONSTRAINT [FK_employeeTbl_designationTbl] FOREIGN KEY([designationId])
REFERENCES [dbo].[designationTbl] ([designationId])
GO
ALTER TABLE [dbo].[employeeTbl] CHECK CONSTRAINT [FK_employeeTbl_designationTbl]
GO
